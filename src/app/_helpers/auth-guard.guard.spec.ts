import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthGuardGuard } from './auth-guard.guard';
import { TokenService } from '../_services/token.service';

describe('AuthGuardGuard', () => {
  let guard: AuthGuardGuard;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyState = {} as RouterStateSnapshot;

  beforeEach(() => {
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    TestBed.configureTestingModule({
      providers: [
        AuthGuardGuard,
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation when the user is authenticated', () => {
    tokenServiceSpy.isAuthenticated.and.returnValue(true);

    const result = guard.canActivate(dummyRoute, dummyState);

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should block navigation and redirect to /login when the user is not authenticated', () => {
    tokenServiceSpy.isAuthenticated.and.returnValue(false);

    const result = guard.canActivate(dummyRoute, dummyState);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });
});
