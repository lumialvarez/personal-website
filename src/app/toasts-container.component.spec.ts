import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastsContainerComponent } from './toasts-container.component';
import { ToastService } from './_services/toast.service';

describe('ToastsContainerComponent', () => {
  let component: ToastsContainerComponent;
  let fixture: ComponentFixture<ToastsContainerComponent>;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule],
      declarations: [ToastsContainerComponent],
      providers: [ToastService]
    });

    fixture = TestBed.createComponent(ToastsContainerComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isTemplate', () => {
    it('should return true when the toast payload is a TemplateRef', () => {
      const fakeTemplate = Object.create(TemplateRef.prototype) as TemplateRef<any>;
      const toast = { textOrTpl: fakeTemplate };

      expect(component.isTemplate(toast)).toBeTrue();
    });

    it('should return false when the toast payload is a plain string', () => {
      const toast = { textOrTpl: 'just a string' };

      expect(component.isTemplate(toast)).toBeFalse();
    });

    it('should return false when the toast payload is null or undefined', () => {
      expect(component.isTemplate({ textOrTpl: null })).toBeFalse();
      expect(component.isTemplate({ textOrTpl: undefined })).toBeFalse();
    });
  });

  it('should bind to the ToastService provided list', () => {
    toastService.show('a toast');

    expect(component.toastService.toasts.length).toBe(1);
    expect(component.toastService.toasts[0].textOrTpl).toBe('a toast');
  });
});
