import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {Observable} from 'rxjs/internal/Observable';
import {UserListResponse} from './dto/get-users-response';
import {User} from '../../_models/user';
import {UpdateUserRequest} from './dto/update-user-request';

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly apiUserUrl: string = null;
  constructor(private httpClient: HttpClient) {
    this.apiUserUrl = GlobalConstants.userPath;
  }

  public getUsers(): Observable<UserListResponse> {
    return this.httpClient.get<UserListResponse>(this.apiUserUrl);
  }

  public updateUser(updateUserRequest: UpdateUserRequest): Observable<any>{
    return this.httpClient.put<any>(this.apiUserUrl, updateUserRequest);
  }
}
