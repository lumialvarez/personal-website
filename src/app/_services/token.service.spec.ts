import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';

import { TokenService } from './token.service';
import { User } from '../_models/user';

describe('TokenService', () => {
  let service: TokenService;
  let jwtHelperSpy: jasmine.SpyObj<JwtHelperService>;

  const TOKEN_KEY = 'AuthToken';
  const USERNAME_KEY = 'AuthUser';

  beforeEach(() => {
    jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired']);

    TestBed.configureTestingModule({
      providers: [
        TokenService,
        { provide: JwtHelperService, useValue: jwtHelperSpy }
      ]
    });

    service = TestBed.inject(TokenService);
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setToken / getToken', () => {
    it('should store the token in sessionStorage under the AuthToken key', () => {
      service.setToken('abc.def.ghi');

      expect(sessionStorage.getItem(TOKEN_KEY)).toBe('abc.def.ghi');
    });

    it('should return the previously stored token', () => {
      sessionStorage.setItem(TOKEN_KEY, 'stored-token');

      expect(service.getToken()).toBe('stored-token');
    });

    it('should overwrite any existing token', () => {
      sessionStorage.setItem(TOKEN_KEY, 'old-token');

      service.setToken('new-token');

      expect(sessionStorage.getItem(TOKEN_KEY)).toBe('new-token');
    });

    it('should return null when there is no token stored', () => {
      expect(service.getToken()).toBeNull();
    });
  });

  describe('setUser / getUser', () => {
    it('should serialize and store a user in sessionStorage', () => {
      const user = new User();
      user.userId = 7;
      user.name = 'Luis';
      user.userName = 'lumialvarez';
      user.email = 'luis@example.com';
      user.role = 'ADMIN';
      user.status = true;

      service.setUser(user);

      const raw = sessionStorage.getItem(USERNAME_KEY);
      expect(raw).toBeTruthy();
      expect(JSON.parse(raw)).toEqual(jasmine.objectContaining({
        userId: 7,
        name: 'Luis',
        userName: 'lumialvarez',
        email: 'luis@example.com',
        role: 'ADMIN',
        status: true
      }));
    });

    it('should retrieve the stored user as a User instance', () => {
      const user = new User();
      user.userId = 1;
      user.userName = 'admin';
      service.setUser(user);

      const result = service.getUser();

      expect(result).toBeTruthy();
      expect(result.userId).toBe(1);
      expect(result.userName).toBe('admin');
    });

    it('should overwrite the previously stored user', () => {
      const first = new User();
      first.userName = 'first';
      const second = new User();
      second.userName = 'second';

      service.setUser(first);
      service.setUser(second);

      expect(JSON.parse(sessionStorage.getItem(USERNAME_KEY)).userName).toBe('second');
    });
  });

  describe('logOut', () => {
    it('should clear the entire sessionStorage', () => {
      sessionStorage.setItem(TOKEN_KEY, 'token');
      sessionStorage.setItem(USERNAME_KEY, 'user');
      sessionStorage.setItem('other', 'value');

      service.logOut();

      expect(sessionStorage.length).toBe(0);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when the stored token is not expired', () => {
      service.setToken('valid-token');
      (spyOn(service.jwtHelper, 'isTokenExpired') as jasmine.Spy).and.callFake(() => false);

      expect(service.isAuthenticated()).toBeTrue();
      expect(service.jwtHelper.isTokenExpired).toHaveBeenCalled();
    });

    it('should return false when the stored token is expired', () => {
      service.setToken('expired-token');
      (spyOn(service.jwtHelper, 'isTokenExpired') as jasmine.Spy).and.callFake(() => true);

      expect(service.isAuthenticated()).toBeFalse();
    });

    it('should not throw when no token is stored', () => {
      (spyOn(service.jwtHelper, 'isTokenExpired') as jasmine.Spy).and.callFake(() => true);

      expect(() => service.isAuthenticated()).not.toThrow();
    });
  });
});

