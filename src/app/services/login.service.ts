import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GlobalConstants } from './../common/global-constants';
import { LoginUsuario } from 'app/models/login-usuario';
import { JwtDTO } from 'app/models/jwt-dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiLoginUrl: string = null;

  constructor(private httpClient: HttpClient) {
    this.apiLoginUrl = GlobalConstants.apiBasePath + GlobalConstants.loginPath;
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.apiLoginUrl, loginUsuario);
  }
}