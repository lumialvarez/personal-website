import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginRequest} from '../_services/http/login/dto/login-request';
import {TokenService} from '../_services/token.service';
import {ToastService} from '../_services/toast.service';
import {LoginService} from '../_services/http/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  errMsj: string[] = [];

  userName: string;
  passwordUser: string;
  isLoginFail = false;

  public loginRequest: LoginRequest;

  constructor(
    private tokenService: TokenService,
    private loginService: LoginService,
    private router: Router,
    public toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigate(['portal']).then(() => {
      });
    }
  }

  ngAfterViewInit(): void {
    document.body.classList.add('gradient');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('gradient');
  }

  login(): void {
    this.loginRequest = new LoginRequest(this.userName, this.passwordUser);
    this.loginService.login(this.loginRequest).subscribe(
      dataLogin => {
        this.loginService.getCurrentUserOfToken(dataLogin.token).subscribe(
          dataUser => {
            this.tokenService.setToken(dataLogin.token);
            this.tokenService.setUser(dataUser);
            this.router.navigate(['portal']).then(() => {
            });
          },
          err => {
            this.isLoginFail = true;
            this.errMsj = err.error.Cause;
            this.errMsj.forEach(detail => {
              this.toastService.showDanger(detail);
            });
          }
        );
      },
      err => {
        console.log(err);
        this.isLoginFail = true;
        this.errMsj = err.error.Cause;
        this.errMsj.forEach(detail => {
          this.toastService.showDanger(detail);
        });
      }
    );
  }

}
