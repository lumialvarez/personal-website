import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  public show(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({ textOrTpl, ...options });
  }

  showInfo(textOrTpl: string | TemplateRef<any>): void {
    this.show(textOrTpl, { classname: 'bg-info text-light', delay: 3000, title: '' });
  }

  showSuccess(textOrTpl: string | TemplateRef<any>): void {
    this.show(textOrTpl, { classname: 'bg-success text-light', delay: 3000, title: 'Exito!' });
  }

  showDanger(textOrTpl: string | TemplateRef<any>): void {
    this.show(textOrTpl, { classname: 'bg-danger text-light', delay: 3000, title: 'Error' });
  }
  remove(toast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
