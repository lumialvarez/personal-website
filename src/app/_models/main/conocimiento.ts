import { CategoriaConocimiento } from './categoria-conocimiento';
import { TipoConocimiento } from './tipo-conocimiento';

export class Conocimiento {
    constructor(){
        this.categorias = [];
    }

    id: number;
    nombre: string;
    tipo: TipoConocimiento;
    nivel: number;
    descripcion: string;
    categorias: CategoriaConocimiento[];
}

