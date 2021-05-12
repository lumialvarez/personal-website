import { CategoriaConocimiento } from "./categoria-conocimiento";
import { TipoConocimiento } from "./tipo-conocimiento";

export class Conocimiento {
    id: Int32Array;
    nombre: string;
    tipo: TipoConocimiento;
    nivel: Int32Array;
    descripcion: string;
    categorias: CategoriaConocimiento[];
}

