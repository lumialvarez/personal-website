export class TipoConocimiento {
    constructor(anyObject: any){
        this.id = anyObject.id;
        this.nombre = anyObject.nombre;
    }

    id: Int32Array;
    nombre: string;
}
