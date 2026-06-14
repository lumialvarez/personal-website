import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { GlobalConstants } from '../../../common/global-constants';
import { LoginRequest } from './dto/login-request';
import { LoginResponse } from './dto/login-response';
import { User } from '../../../_models/user';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should POST the credentials to the login endpoint', () => {
    const request = new LoginRequest('admin', 'secret');
    const mockResponse: LoginResponse = {
      token: 'jwt-token',
      userId: 1,
      userName: 'admin',
      role: 'ADMIN'
    };

    let actual: LoginResponse | undefined;
    service.login(request).subscribe(res => (actual = res));

    const req = httpMock.expectOne(
      r => r.method === 'POST' && r.url === GlobalConstants.loginPath
    );
    expect(req.request.body).toEqual(request);
    req.flush(mockResponse);

    expect(actual).toEqual(mockResponse);
  });

  it('getCurrentUser should GET the current user endpoint', () => {
    const mockUser = new User();
    mockUser.userId = 1;
    mockUser.userName = 'admin';

    let actual: User | undefined;
    service.getCurrentUser().subscribe(u => (actual = u));

    const req = httpMock.expectOne(
      r => r.method === 'GET' && r.url === GlobalConstants.currentUserPath
    );
    req.flush(mockUser);

    expect(actual).toEqual(mockUser);
  });

  it('getCurrentUserOfToken should send Authorization Bearer header with the token', () => {
    const mockUser = new User();
    mockUser.userId = 2;
    mockUser.userName = 'token-user';

    let actual: User | undefined;
    service.getCurrentUserOfToken('my-token').subscribe(u => (actual = u));

    const req = httpMock.expectOne(
      r => r.method === 'GET' && r.url === GlobalConstants.currentUserPath
    );

    expect(req.request.headers.get('Authorization')).toBe('Bearer my-token');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockUser);

    expect(actual).toEqual(mockUser);
  });
});
