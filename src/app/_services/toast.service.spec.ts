import { TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created with an empty toasts list', () => {
    expect(service).toBeTruthy();
    expect(service.toasts).toEqual([]);
  });

  describe('show', () => {
    it('should push a toast with the provided text and options', () => {
      service.show('hello', { classname: 'bg-custom', delay: 1000, title: 'Hi' });

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].textOrTpl).toBe('hello');
      expect(service.toasts[0].classname).toBe('bg-custom');
      expect(service.toasts[0].delay).toBe(1000);
      expect(service.toasts[0].title).toBe('Hi');
    });

    it('should default options to an empty object when not provided', () => {
      service.show('hi');

      expect(service.toasts[0].classname).toBeUndefined();
      expect(service.toasts[0].delay).toBeUndefined();
    });

    it('should accept a TemplateRef as textOrTpl', () => {
      const fakeTemplate = {} as TemplateRef<any>;
      service.show(fakeTemplate);

      expect(service.toasts[0].textOrTpl).toBe(fakeTemplate);
    });
  });

  describe('showInfo / showSuccess / showDanger', () => {
    it('showInfo should push a toast with bg-info styling', () => {
      service.showInfo('info-msg');

      expect(service.toasts[0]).toEqual(jasmine.objectContaining({
        textOrTpl: 'info-msg',
        classname: 'bg-info text-light',
        delay: 8000,
        title: ''
      }));
    });

    it('showSuccess should push a toast with bg-success styling and "Exito!" title', () => {
      service.showSuccess('ok-msg');

      expect(service.toasts[0]).toEqual(jasmine.objectContaining({
        textOrTpl: 'ok-msg',
        classname: 'bg-success text-light',
        delay: 8000,
        title: 'Exito!'
      }));
    });

    it('showDanger should push a toast with bg-danger styling and "Error" title', () => {
      service.showDanger('fail-msg');

      expect(service.toasts[0]).toEqual(jasmine.objectContaining({
        textOrTpl: 'fail-msg',
        classname: 'bg-danger text-light',
        delay: 8000,
        title: 'Error'
      }));
    });
  });

  describe('remove', () => {
    it('should remove the matching toast from the list', () => {
      service.show('first');
      service.show('second');
      const toRemove = service.toasts[0];

      service.remove(toRemove);

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].textOrTpl).toBe('second');
    });

    it('should do nothing when the toast is not in the list', () => {
      service.show('only');
      const fakeToast = { textOrTpl: 'unknown' };

      service.remove(fakeToast);

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].textOrTpl).toBe('only');
    });
  });
});
