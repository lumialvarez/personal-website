import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'app/_models/login-usuario';
import { LoginService } from 'app/_services/login.service';
import { ToastService } from 'app/_services/toast.service';
import { TokenService } from 'app/_services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errMsj:string[] = [];

  nombreUsuario: string;
  passwordUsuario: string;
  isLoginfail = false;

  public loginUsuario: LoginUsuario;

  constructor(
    private tokenService: TokenService,
    private loginService: LoginService,
    private router: Router,
    public toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigate(['portal']);
    }
  }

  inicioSesion() {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.passwordUsuario);
    this.loginService.login(this.loginUsuario).subscribe(
      dataLogin => {
        this.loginService.getUserByUsername(dataLogin.nombreUsuario, dataLogin.token).subscribe(
          dataUser => {
            this.tokenService.setToken(dataLogin.token);
            this.tokenService.setUser(dataUser);
            this.tokenService.setAuthorities(dataLogin.authorities);
            this.router.navigate(['portal']);
          },
          err => {
            this.isLoginfail = true;
            this.errMsj = err.error.details;
            this.errMsj.forEach(detail => {
              this.toastService.showDanger(detail);
            });
          }
        )
      },
      err => {
        console.log(err);
        this.isLoginfail = true;
        this.errMsj = err.error.details;
        this.errMsj.forEach(detail => {
          this.toastService.showDanger(detail);
        });
      }
    );
  }

}