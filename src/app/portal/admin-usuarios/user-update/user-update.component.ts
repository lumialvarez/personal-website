import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../../_services/toast.service';
import {User} from '../../../_models/user';
import {UserService} from '../../../_services/http/user/user.service';
import {UpdateUserRequest} from '../../../_services/http/user/dto/update-user-request';
import {CreateUserRequest} from '../../../_services/http/user/dto/create-user-request';
import {CommonError} from '../../../_services/http/Error';

@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.css']
})

export class UserUpdateComponent implements OnInit {

    public userEdit: User;
    public user: User;
    public isNewUser: boolean;
    public password1 = '';
    public password2 = '';

    constructor(public activeModal: NgbActiveModal, public toastService: ToastService, public userService: UserService) {
    }

    ngOnInit(): void {
        if (this.user != null && this.user.userId > 0) {
            this.userEdit = new User(this.user);
            this.isNewUser = false;
        } else {
            this.userEdit = new User();
            this.isNewUser = true;
        }
    }

    public actionSave(): void {
        this.password1 = this.password1.trim();
        this.password2 = this.password2.trim();

        if (this.userEdit.userName.trim().length === 0) {
            this.toastService.showDanger('Debe ingresar un usuario');
            return;
        }

        if (this.isNewUser) {
            this.createNewUser();
        } else {
            this.updateUser();
        }
    }

    private createNewUser(): void {
        if (this.password1.length === 0 || this.password2.length === 0) {
            this.toastService.showDanger('Debe ingresar la contraseñas');
            return;
        }
        if (this.password1 !== this.password2) {
            this.toastService.showDanger('Las contraseñas deben de coincidir');
            return;
        }
        this.userEdit.password = this.password1;
        const createUserRequest: CreateUserRequest = new CreateUserRequest(this.userEdit);
        this.userService.createUser(createUserRequest).subscribe(
            data => {
                this.toastService.showSuccess('Usuario creado');
                this.activeModal.dismiss('saved data');
            },
            err => {
                this.toastService.showDanger('Error al guardar los datos');
                (new CommonError(err.error, this.toastService)).printErrorDetails();
            }
        );
    }

    private updateUser(): void {
        if (this.password1.length > 0 || this.password2.length > 0) {
            if (this.password1 !== this.password2) {
                this.toastService.showDanger('Las contraseñas deben de coincidir');
                return;
            }
            this.userEdit.password = this.password1;
        }

        const updateUserRequest: UpdateUserRequest = new UpdateUserRequest();
        updateUserRequest.user = this.userEdit;
        this.userService.updateUser(updateUserRequest).subscribe(
            data => {
                this.toastService.showSuccess('Usuario actualizado');
                this.activeModal.dismiss('saved data');
            },
            err => {
                this.toastService.showDanger('Error al guardar los datos');
                (new CommonError(err.error, this.toastService)).printErrorDetails();
            }
        );
    }
}
