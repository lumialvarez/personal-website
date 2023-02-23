import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {User} from '../_models/user';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUser';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() { }

  public setToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public setUser(user: User): void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, JSON.stringify(user));
  }

  public getUser(): User{
    return JSON.parse(window.sessionStorage.getItem(USERNAME_KEY));
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }
}
