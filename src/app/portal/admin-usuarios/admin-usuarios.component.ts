import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user/user.service';
import {User} from '../../_models/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserUpdateComponent} from './user-update/user-update.component';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {

  public users: User[];

  constructor(private modalService: NgbModal, private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUsers().subscribe(
      userListResponse => {
        console.log(userListResponse);
        this.users = userListResponse.users;
        console.log(this.users);
      },
      err => {
        console.log(err);
      }
    );
  }

  openModalUpdateUser(user: User): void {
    const modalRef = this.modalService.open(UserUpdateComponent, {size: 'lg'});
    modalRef.componentInstance.user = user;
    modalRef.dismissed.subscribe(
      data => {
        // cuando se cierre el modal actualizar lista
        console.log(data);
      }
    );
  }
}
