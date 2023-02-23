import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'app/_models/user';
import {NotificationService} from 'app/_services/notification.service';
import {TokenService} from 'app/_services/token.service';
import {LoginService} from '../_services/login.service';

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
              private notificacionService: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.processNotificationCount();
  }

  setReadNotification(id: Int32Array): void {
    this.notificacionService.SetReadNotification(id).subscribe({
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
