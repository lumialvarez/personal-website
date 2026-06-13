import {ChangeDetectorRef, Component, DestroyRef, OnInit, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UserService} from '../../_services/http/user/user.service';
import {User} from '../../_models/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserUpdateComponent} from './user-update/user-update.component';

@Component({
    selector: 'app-admin-usuarios',
    standalone: false,
    templateUrl: './admin-usuarios.component.html',
    styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {

    public users: User[];

    private readonly destroyRef = inject(DestroyRef);
    private readonly cdr = inject(ChangeDetectorRef);

    constructor(private modalService: NgbModal, private userService: UserService) {
    }

    ngOnInit(): void {
        this.loadUserData();
    }

    loadUserData(): void {
        this.userService.getUsers()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (userListResponse) => {
                    this.users = userListResponse.users;
                    this.cdr.markForCheck();
                },
                error: (err) => {
                    console.error(err);
                    this.cdr.markForCheck();
                }
            });
    }

    private openUserModal(user: User | null): void {
        const modalRef = this.modalService.open(UserUpdateComponent, {size: 'lg'});
        modalRef.componentInstance.user = user;
        modalRef.dismissed
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data) => {
                if (data !== 'closed') {
                    this.loadUserData();
                }
                this.cdr.markForCheck();
            });
    }

    openModalCreateUser(): void {
        this.openUserModal(null);
    }

    openModalUpdateUser(user: User): void {
        this.openUserModal(user);
    }
}
