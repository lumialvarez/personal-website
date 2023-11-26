import {User} from '../../../../_models/user';

export class CreateUserRequest {
    name: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    constructor(user: User) {
        this.name = user.name;
        this.userName = user.userName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }
}
