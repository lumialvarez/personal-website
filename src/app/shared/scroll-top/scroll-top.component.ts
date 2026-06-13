import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="scroll-top"
      [class.visible]="visible"
      aria-label="Volver arriba"
      (click)="scrollTop()">
      <i class="fas fa-chevron-up" aria-hidden="true"></i>
    </button>
  `,
})
export class ScrollTopComponent {
  visible = false;
  private readonly destroyRef = inject(DestroyRef);
  private rafId?: number;

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.rafId) {
      return;
    }
    this.rafId = requestAnimationFrame(() => {
      this.visible = window.scrollY > 480;
      this.rafId = undefined;
    });
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
