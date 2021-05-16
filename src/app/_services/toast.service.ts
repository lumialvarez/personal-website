import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  public show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showSuccess(textOrTpl: string | TemplateRef<any>) {
    this.show(textOrTpl, { classname: 'bg-success text-light', delay: 5000 });
  }
  
  showDanger(textOrTpl: string | TemplateRef<any>) {
    this.show(textOrTpl, { classname: 'bg-danger text-light', delay: 5000 });
  }
  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
