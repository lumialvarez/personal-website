import { CategoriaConocimiento } from "./categoria-conocimiento";
import { TipoConocimiento } from "./tipo-conocimiento";

export class Conocimiento {
    id: number;
    nombre: string;
    tipo: TipoConocimiento;
    nivel: number;
    descripcion: string;
    categorias: CategoriaConocimiento[];
}

