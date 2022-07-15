import { Conocimiento } from './conocimiento';
import { Idioma } from './idioma';
import { Proyecto } from './proyecto';

export class Perfil {
    id: Int32Array;
    nombre: string;
    profesion: string;
    perfilProfesional: string;
    perfilPersonal: string;
    proyectos: Proyecto[];
    conocimientos: Conocimiento[];
    idioma: Idioma;
    estado: boolean;
}
