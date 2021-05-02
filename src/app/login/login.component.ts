import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'app/models/login-usuario';
import { LoginService } from 'app/services/login.service';
import { TokenService } from 'app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errMsj = [];

  nombreUsuario: string;
  passwordUsuario: string;
  isLoginfail = false;

  public loginUsuario: LoginUsuario;

  constructor(
    private tokenService: TokenService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.router.navigate(['portal']);
    }
  }

  inicioSesion() {
    console.log(this.nombreUsuario);
    console.log(this.passwordUsuario);
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.passwordUsuario);
    this.loginService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.router.navigate(['portal']);
      },
      err => {
        this.isLoginfail = true;
        this.errMsj = err.details;
      }
    );
  }

}