import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../../_services/toast.service';
import {User} from '../../../_models/user';
import {UserService} from '../../../_services/user/user.service';
import {UpdateUserRequest} from '../../../_services/user/dto/update-user-request';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})

export class UserUpdateComponent implements OnInit {

  public userEdit: User;
  public user: User;
  public password1 = '';
  public password2 = '';

  constructor(public activeModal: NgbActiveModal, public toastService: ToastService, public userService: UserService) {
  }

  ngOnInit(): void {
    this.userEdit = new User(this.user);
  }

  saveUser(): void {
    this.toastService.showDanger('Prueba');
    console.log('ok');

    if (this.password1.length > 0 || this.password2.length > 0) {
      if (this.password1 !== this.password2){
        this.toastService.showDanger('Las contraseñas deben de coincidir');
        return;
      }
      this.userEdit.password = this.password1;
    }
    console.log('oks');
    const updateUserRequest: UpdateUserRequest = new UpdateUserRequest();
    updateUserRequest.user = this.userEdit;
    this.userService.updateUser(updateUserRequest).subscribe(
        data => {
          this.toastService.showSuccess('Usuario actualizado');
          this.activeModal.dismiss();
        },
        err => {
          this.toastService.showDanger('Error al guardar los datos ');
          err.error.details.forEach(detail => {
            this.toastService.showDanger(detail);
          });
        }
    );
  }
}
