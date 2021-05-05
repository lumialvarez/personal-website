import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/_models/user';
import { TokenService } from 'app/_services/token.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  toggleSidebar: boolean = false;
  usuario: User;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = this.tokenService.getUser();
  }

  toggleSidebarEvent() {
    this.toggleSidebar = !this.toggleSidebar;
  }

  cerrarSesion() {
    this.tokenService.logOut();
    this.router.navigate(['login']);
  }


}
