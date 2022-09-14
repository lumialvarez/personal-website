import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Notificacion} from 'app/_models/notificacion';
import {User} from 'app/_models/user';
import {NotificacionService} from 'app/_services/notificacion.service';
import {TokenService} from 'app/_services/token.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  toggleSidebar = false;
  usuario: User;
  notificaciones: Notificacion[] = [];

  constructor(private tokenService: TokenService, private notificacionService: NotificacionService, private router: Router) {
  }

  ngOnInit(): void {
    this.usuario = this.tokenService.getUser();
    this.notificacionService.getUnreadNotificaciones().subscribe({
      next: (data) => {
        this.notificaciones = data;
      },
      error: (err) => console.log(err)
    });
  }

  marcarNotificacionComoLeida(id: number): void {
    this.notificacionService.PutReadNotificaciones(id).subscribe({
      next: (data) => this.notificaciones = this.notificaciones.filter(obj => obj.id !== id),
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
