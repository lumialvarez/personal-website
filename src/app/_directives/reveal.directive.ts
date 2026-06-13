import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  inject,
} from '@angular/core';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

@Directive({
  selector: '[appReveal]',
  standalone: false,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDirection: RevealDirection = 'up';
  @Input() revealDelay = 0;
  @Input() revealThreshold = 0.12;
  @Input() revealOnce = true;
  @Input() revealFallbackMs = 800;

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;
  private fallbackId?: number;

  ngAfterViewInit(): void {
    const el = this.host.nativeElement;
    el.classList.add('reveal', `reveal-${this.revealDirection}`);
    if (this.revealDelay) {
      el.style.transitionDelay = `${this.revealDelay}ms`;
    }

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('revealed');
      return;
    }

    this.fallbackId = window.setTimeout(() => {
      if (!el.classList.contains('revealed')) {
        el.classList.add('revealed');
      }
      this.observer?.disconnect();
    }, this.revealFallbackMs);

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('revealed');
              if (this.fallbackId) {
                clearTimeout(this.fallbackId);
                this.fallbackId = undefined;
              }
              if (this.revealOnce) {
                this.observer?.unobserve(el);
              }
            } else if (!this.revealOnce) {
              el.classList.remove('revealed');
            }
          }
        },
        { threshold: this.revealThreshold, rootMargin: '0px 0px -40px 0px' }
      );
      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.fallbackId) {
      clearTimeout(this.fallbackId);
    }
  }
}
