import {Component, DestroyRef, OnInit, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {LoginService} from '../_services/http/login/login.service';
import {TokenService} from '../_services/token.service';
import {User} from '../_models/user';
import {NotificationService} from '../_services/http/notification/notification.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  toggleSidebar = false;
  user: User;
  notificationsCount = 0;
  userInitial = '?';

  private readonly destroyRef = inject(DestroyRef);

  constructor(private tokenService: TokenService,
              private loginService: LoginService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.userInitial = (this.user?.name || '?').charAt(0).toUpperCase();
    this.processNotificationCount();
  }

  setReadNotification(id: number): void {
    this.notificationService.SetReadNotification(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.refreshUser(),
        error: (err) => console.error(err)
      });
  }

  processNotificationCount(): void {
    this.notificationsCount = (this.user?.notifications || []).filter((d) => !d.read).length;
  }

  refreshUser(): void {
    this.loginService.getCurrentUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (dataUser) => {
          this.user = dataUser;
          this.tokenService.setUser(dataUser);
          this.processNotificationCount();
        },
        error: (err) => console.error(err)
      });
  }

  toggleSidebarEvent(): void {
    this.toggleSidebar = !this.toggleSidebar;
  }

  logout(): void {
    this.tokenService.logOut();
    this.router.navigate(['login']).then(() => {
    });
  }
}
