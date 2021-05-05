import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalConstants } from '../common/global-constants';
import { LoginUsuario } from 'app/_models/login-usuario';
import { JwtDTO } from 'app/_models/jwt-dto';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'app/_models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiLoginUrl: string = null;
  private apiUserUrl: string = null;

  constructor(private httpClient: HttpClient) {
    this.apiLoginUrl = GlobalConstants.apiBasePath + GlobalConstants.loginPath;
    this.apiUserUrl = GlobalConstants.apiBasePath + GlobalConstants.userPath;
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.apiLoginUrl, loginUsuario);
  }

  public getUserByUsername(username: string, token: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.httpClient.get<User>(this.apiUserUrl + "/" + username, httpOptions);
  }
}