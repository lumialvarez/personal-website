import { Component, OnInit } from '@angular/core';
import {ListResponse, User} from '../../_services/user/dto/list-response';
import {UserService} from '../../_services/user/user.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {

  public userList: ListResponse;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.userList = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  openModalUpdateUser(user: User): void {
    console.log(user);
  }
}
