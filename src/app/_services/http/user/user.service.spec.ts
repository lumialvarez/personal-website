import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { GlobalConstants } from '../../../common/global-constants';
import { User } from '../../../_models/user';
import { UserListResponse } from './dto/get-users-response';
import { CreateUserRequest } from './dto/create-user-request';
import { UpdateUserRequest } from './dto/update-user-request';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const buildUser = (id: number, name = 'user', role = 'USER'): User => {
    const u = new User();
    u.userId = id;
    u.userName = name;
    u.name = name;
    u.email = `${name}@example.com`;
    u.password = 'pwd';
    u.role = role;
    u.status = true;
    return u;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers should GET the user list endpoint', () => {
    const mockResponse: UserListResponse = { users: [buildUser(1), buildUser(2)] };

    let actual: UserListResponse | undefined;
    service.getUsers().subscribe(r => (actual = r));

    const req = httpMock.expectOne(
      r => r.method === 'GET' && r.url === GlobalConstants.userPath
    );
    req.flush(mockResponse);

    expect(actual).toEqual(mockResponse);
  });

  it('createUser should POST a CreateUserRequest to the user endpoint', () => {
    const source = buildUser(0, 'new', 'ADMIN');
    const mockResponse = { ok: true };

    let actual: any;
    service.createUser(new CreateUserRequest(source)).subscribe(res => (actual = res));

    const req = httpMock.expectOne(
      r => r.method === 'POST' && r.url === GlobalConstants.userPath
    );
    const body = req.request.body as CreateUserRequest;
    expect(body).toEqual(jasmine.objectContaining({
      name: 'new',
      userName: 'new',
      email: 'new@example.com',
      password: 'pwd',
      role: 'ADMIN'
    }));
    req.flush(mockResponse);

    expect(actual).toEqual(mockResponse);
  });

  it('updateUser should PUT an UpdateUserRequest to the user endpoint', () => {
    const source = buildUser(7, 'updated');
    const request = new UpdateUserRequest();
    request.user = source;
    const mockResponse = { ok: true };

    let actual: any;
    service.updateUser(request).subscribe(res => (actual = res));

    const req = httpMock.expectOne(
      r => r.method === 'PUT' && r.url === GlobalConstants.userPath
    );
    expect(req.request.body).toBe(request);
    req.flush(mockResponse);

    expect(actual).toEqual(mockResponse);
  });
});
