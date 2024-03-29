import {Component, OnInit} from '@angular/core';
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

  constructor(private tokenService: TokenService,
              private loginService: LoginService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.processNotificationCount();
  }

  setReadNotification(id: Int32Array): void {
    this.notificationService.SetReadNotification(id).subscribe({
      next: (data) => {
        this.refreshUser();
      },
      error: (err) => console.log(err)
    });
  }

  processNotificationCount(): void {
    this.notificationsCount = this.user.notifications.filter(d => !d.read).length;
  }

  refreshUser(): void {
    this.loginService.getCurrentUser().subscribe(
      dataUser => {
        this.user = dataUser;
        this.tokenService.setUser(dataUser);
        this.processNotificationCount();
      },
      err => {
        console.log(err);
      }
    );
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
