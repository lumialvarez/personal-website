import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { BasicAuthInterceptor } from './basic-auth-interceptor';
import { TokenService } from '../_services/token.service';

describe('BasicAuthInterceptor', () => {
  let interceptor: BasicAuthInterceptor;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let spinnerSpy: jasmine.SpyObj<NgxSpinnerService>;
  let handlerSpy: jasmine.SpyObj<HttpHandler>;
  const mockResponse = new HttpResponse({ body: { ok: true } });

  beforeEach(() => {
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken', 'isAuthenticated']);
    spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);
    spinnerSpy.show.and.returnValue(Promise.resolve());
    spinnerSpy.hide.and.returnValue(Promise.resolve());
    handlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [
        BasicAuthInterceptor,
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy }
      ]
    });

    interceptor = TestBed.inject(BasicAuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header when the user is authenticated', () => {
    tokenServiceSpy.getToken.and.returnValue('jwt-token');
    tokenServiceSpy.isAuthenticated.and.returnValue(true);
    handlerSpy.handle.and.callFake((req: HttpRequest<any>) => of(mockResponse as HttpEvent<any>));

    const req = new HttpRequest('GET', '/api/data');
    interceptor.intercept(req, handlerSpy).subscribe();

    const sent = handlerSpy.handle.calls.first().args[0] as HttpRequest<any>;
    expect(sent.headers.get('Authorization')).toBe('Bearer jwt-token');
    expect(spinnerSpy.show).toHaveBeenCalled();
    expect(spinnerSpy.hide).toHaveBeenCalled();
  });

  it('should not add Authorization header when the user is not authenticated', () => {
    tokenServiceSpy.getToken.and.returnValue(null);
    tokenServiceSpy.isAuthenticated.and.returnValue(false);
    handlerSpy.handle.and.callFake((req: HttpRequest<any>) => of(mockResponse as HttpEvent<any>));

    const req = new HttpRequest('GET', '/api/data');
    interceptor.intercept(req, handlerSpy).subscribe();

    const sent = handlerSpy.handle.calls.first().args[0] as HttpRequest<any>;
    expect(sent.headers.has('Authorization')).toBeFalse();
    expect(spinnerSpy.show).toHaveBeenCalled();
    expect(spinnerSpy.hide).toHaveBeenCalled();
  });

  it('should show and hide the spinner around the request', () => {
    tokenServiceSpy.isAuthenticated.and.returnValue(false);
    handlerSpy.handle.and.callFake((req: HttpRequest<any>) => of(mockResponse as HttpEvent<any>));

    const req = new HttpRequest('GET', '/api/data');
    interceptor.intercept(req, handlerSpy).subscribe();

    expect(spinnerSpy.show).toHaveBeenCalled();
    expect(spinnerSpy.hide).toHaveBeenCalled();
  });

  it('should hide the spinner even when the request errors', (done) => {
    tokenServiceSpy.isAuthenticated.and.returnValue(false);
    handlerSpy.handle.and.callFake((req: HttpRequest<any>) =>
      new Observable<HttpEvent<any>>(subscriber => {
        subscriber.error(new Error('boom'));
      })
    );

    const req = new HttpRequest('GET', '/api/data');
    interceptor.intercept(req, handlerSpy).subscribe({
      next: () => done.fail('expected error'),
      error: () => {
        expect(spinnerSpy.show).toHaveBeenCalled();
        setTimeout(() => {
          expect(spinnerSpy.hide).toHaveBeenCalled();
          done();
        }, 0);
      }
    });
  });
});
