import {AfterViewInit, Component, DestroyRef, OnDestroy, OnInit, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {LoginRequest} from '../_services/http/login/dto/login-request';
import {TokenService} from '../_services/token.service';
import {ToastService} from '../_services/toast.service';
import {LoginService} from '../_services/http/login/login.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  errMsj: string[] = [];

  userName: string;
  passwordUser: string;
  isLoginFail = false;

  public loginRequest: LoginRequest;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private tokenService: TokenService,
    private loginService: LoginService,
    private router: Router,
    public toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenService.isAuthenticated()) {
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

  private showErrors(cause: string[]): void {
    this.isLoginFail = true;
    this.errMsj = cause || [];
    this.errMsj.forEach((detail) => this.toastService.showDanger(detail));
  }

  login(): void {
    this.loginRequest = new LoginRequest(this.userName, this.passwordUser);
    this.loginService.login(this.loginRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (dataLogin) => {
          this.loginService.getCurrentUserOfToken(dataLogin.token)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: (dataUser) => {
                this.tokenService.setToken(dataLogin.token);
                this.tokenService.setUser(dataUser);
                this.router.navigate(['portal']).then(() => {});
              },
              error: (err) => this.showErrors(err?.error?.Cause)
            });
        },
        error: (err) => this.showErrors(err?.error?.Cause)
      });
  }

}
