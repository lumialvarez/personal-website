import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GlobalConstants} from '../common/global-constants';
import {LoginRequest} from 'app/_services/dto/login-request';
import {LoginResponse} from 'app/_services/dto/login-response';
import {Observable} from 'rxjs/internal/Observable';
import {User} from 'app/_models/user';

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
