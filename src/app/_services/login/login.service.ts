import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {LoginRequest} from './dto/login-request';
import {LoginResponse} from './dto/login-response';
import {User} from '../../_models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiLoginUrl: string = null;
  private readonly apiCurrentUserUrl: string = null;

  constructor(private httpClient: HttpClient) {
    this.apiLoginUrl = GlobalConstants.loginPath;
    this.apiCurrentUserUrl = GlobalConstants.currentUserPath;
  }

  // @ts-ignore
  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.apiLoginUrl, loginRequest);
  }

  public getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(this.apiCurrentUserUrl);
  }

  public getCurrentUserOfToken(token: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.httpClient.get<User>(this.apiCurrentUserUrl, httpOptions);
  }
}
