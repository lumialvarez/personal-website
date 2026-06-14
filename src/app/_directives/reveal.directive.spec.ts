import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RevealDirective } from './reveal.directive';

interface ObserverEntry {
  isIntersecting: boolean;
}

type ObserverCallback = (entries: ObserverEntry[]) => void;

class MockIntersectionObserver {
  public static instances: MockIntersectionObserver[] = [];
  public static lastInstance(): MockIntersectionObserver | undefined {
    return this.instances[this.instances.length - 1];
  }
  public callback: ObserverCallback;
  public observed: Element[] = [];
  public options: IntersectionObserverInit | undefined;
  public unobserveCalls = 0;
  public disconnectCalls = 0;

  constructor(callback: ObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
    MockIntersectionObserver.instances.push(this);
  }

  observe(el: Element): void {
    this.observed.push(el);
  }

  unobserve(el: Element): void {
    this.unobserveCalls += 1;
    this.observed = this.observed.filter(o => o !== el);
  }

  disconnect(): void {
    this.disconnectCalls += 1;
  }

  trigger(entries: ObserverEntry[]): void {
    this.callback(entries);
  }
}

@Component({
  standalone: false,
  template: `
    <div
      #host
      appReveal
      [revealDirection]="direction"
      [revealDelay]="delay"
      [revealThreshold]="threshold"
      [revealOnce]="once"
      [revealFallbackMs]="fallbackMs"
    >content</div>
  `
})
class HostComponent {
  direction: any = 'up';
  delay = 0;
  threshold = 0.12;
  once = true;
  fallbackMs = 800;
}

describe('RevealDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostElement: HTMLElement;
  let originalIO: any;

  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    originalIO = (globalThis as any).IntersectionObserver;
    (globalThis as any).IntersectionObserver = MockIntersectionObserver;
  });

  afterEach(() => {
    (globalThis as any).IntersectionObserver = originalIO;
  });

  const configure = (overrides: Partial<HostComponent> = {}) => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, RevealDirective]
    });
    fixture = TestBed.createComponent(HostComponent);
    Object.assign(fixture.componentInstance, overrides);
    fixture.detectChanges();
    hostElement = fixture.nativeElement.querySelector('div') as HTMLElement;
  };

  it('should add reveal and reveal-direction classes to the host element', () => {
    configure({ direction: 'left' });

    expect(hostElement.classList.contains('reveal')).toBeTrue();
    expect(hostElement.classList.contains('reveal-left')).toBeTrue();
  });

  it('should default to the "up" direction', () => {
    configure();

    expect(hostElement.classList.contains('reveal-up')).toBeTrue();
  });

  it('should apply the transition delay when revealDelay is set', () => {
    configure({ delay: 250 });

    expect(hostElement.style.transitionDelay).toBe('250ms');
  });

  it('should not apply a transition delay when revealDelay is 0', () => {
    configure({ delay: 0 });

    expect(hostElement.style.transitionDelay).toBe('');
  });

  it('should create an IntersectionObserver with the configured threshold', () => {
    configure({ threshold: 0.5 });

    const observer = MockIntersectionObserver.lastInstance()!;
    expect(observer).toBeTruthy();
    expect(observer.options?.threshold).toBe(0.5);
  });

  it('should observe the host element', () => {
    configure();

    const observer = MockIntersectionObserver.lastInstance()!;
    expect(observer.observed).toContain(hostElement);
  });

  it('should add the "revealed" class and unobserve when intersecting (revealOnce = true)', () => {
    configure({ once: true });
    const observer = MockIntersectionObserver.lastInstance()!;

    observer.trigger([{ isIntersecting: true }]);

    expect(hostElement.classList.contains('revealed')).toBeTrue();
    expect(observer.unobserveCalls).toBe(1);
  });

  it('should remove the "revealed" class on leave when revealOnce = false', () => {
    configure({ once: false });
    const observer = MockIntersectionObserver.lastInstance()!;

    observer.trigger([{ isIntersecting: true }]);
    expect(hostElement.classList.contains('revealed')).toBeTrue();
    expect(observer.unobserveCalls).toBe(0);

    observer.trigger([{ isIntersecting: false }]);
    expect(hostElement.classList.contains('revealed')).toBeFalse();
  });

  it('should fallback to "revealed" after the configured timeout when never intersecting', fakeAsync(() => {
    configure({ fallbackMs: 500 });

    expect(hostElement.classList.contains('revealed')).toBeFalse();

    tick(500);

    expect(hostElement.classList.contains('revealed')).toBeTrue();
  }));

  it('should skip creating an IntersectionObserver and reveal immediately when IO is undefined', () => {
    (globalThis as any).IntersectionObserver = undefined;
    configure();

    expect(MockIntersectionObserver.instances.length).toBe(0);
    expect(hostElement.classList.contains('revealed')).toBeTrue();
  });

  it('should disconnect the observer when the host component is destroyed', () => {
    configure();
    const observer = MockIntersectionObserver.lastInstance()!;

    fixture.destroy();

    expect(observer.disconnectCalls).toBe(1);
  });
});
