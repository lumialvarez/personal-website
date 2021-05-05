import { Rol } from "./rol";

export class User {
    id: Int32Array;
    nombre: string;
    nombreUsuario: string;
    email: string;
    roles: Rol[]; 

}
