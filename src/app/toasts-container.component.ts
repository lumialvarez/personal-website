import {Component, TemplateRef} from '@angular/core';
import {ToastService} from './_services/toast.service';


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [animation]="true"
      [autohide]="true"
      [delay]="toast.delay || 8000"
      (hidden)="toastService.remove(toast)"
      [header]="toast.title"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  // tslint:disable-next-line:no-host-metadata-property
  host: {class: 'toast-container position-fixed top-0 end-0 p-3', '[class.ngb-toasts]': 'true', style: 'z-index: 1200'}
})

export class ToastsContainerComponent {
  constructor(public toastService: ToastService) {
  }

  isTemplate(toast): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
