import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'app/_models/user';
import {NotificationService} from 'app/_services/notification.service';
import {TokenService} from 'app/_services/token.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  toggleSidebar = false;
  user: User;

  constructor(private tokenService: TokenService, private notificacionService: NotificationService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
  }

  setReadNotification(id: Int32Array): void {
    this.notificacionService.SetReadNotification(id).subscribe({
      next: (data) => this.user.notifications = this.user.notifications.filter(obj => obj.id !== id),
      error: (err) => console.log(err)
    });
  }

  toggleSidebarEvent(): void {
    this.toggleSidebar = !this.toggleSidebar;
  }

  cerrarSesion(): void {
    this.tokenService.logOut();
    this.router.navigate(['login']).then(() => {
    });
  }

}
