import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Conocimiento } from 'app/_models/main/conocimiento';
import { Perfil } from 'app/_models/main/perfil';
import { Proyecto } from 'app/_models/main/proyecto';
import { PerfilService } from 'app/_services/perfil.service';
import { ToastService } from 'app/_services/toast.service';
import { AdminConocimientoComponent } from './admin-conocimiento/admin-conocimiento.component';
import { AdminProyectoComponent } from './admin-proyecto/admin-proyecto.component';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {

  constructor(private modalService: NgbModal, private perfilService: PerfilService, private toastService: ToastService) { }
  public lstPerfiles: Perfil[];
  public perfilSeleccionado: Perfil = null;
  public idiomaSeleccionado: string = null;
  public filtroConocimiento = '';

  ordenPorNombreIsChecked = false;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Ingresa el texto...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    fonts: [

    ],
    toolbarHiddenButtons: [
      [
        'heading',
        'fontName',
        'insertVideo'
      ]],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  ngOnInit(): void {
    this.cargarDatosPerfil();
  }

  cargarDatosPerfil(): void {
    this.perfilSeleccionado = null;
    this.perfilService.getPerfiles().subscribe(
      data => {
        this.lstPerfiles = data;
        if (this.lstPerfiles.length === 1) {
          this.perfilSeleccionado = this.lstPerfiles[0];
          this.procesarSeleccionPerfil();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  procesarSeleccionPerfil(): void {
    this.idiomaSeleccionado = this.perfilSeleccionado.idioma.nombre;
    this.perfilSeleccionado.proyectos.sort((a: Proyecto, b: Proyecto) => -(b.id - a.id));
    this.ordenarConocimientos('nombre');
  }

  guardarCambiosPerfil(): void {
    this.perfilService.updatePerfil(this.perfilSeleccionado).subscribe(
      data => {
        this.toastService.showSuccess('Perfil Actualizado');
        console.log(data);
      },
      err => {
        err.error.details.forEach(detail => {
          this.toastService.showDanger(detail);
        });
      }
    );
  }

  ordenarConocimientos(filtro: string): void {
    if (filtro === 'nombre') {
      this.perfilSeleccionado.conocimientos.sort((a: Conocimiento, b: Conocimiento) => a.nombre.localeCompare(b.nombre));
    } else if (filtro === 'nivel') {
      this.perfilSeleccionado.conocimientos.sort((a: Conocimiento, b: Conocimiento) => -(a.nivel - b.nivel));
    }else if (filtro === 'tipoNivel') {
      // tslint:disable-next-line:max-line-length
      this.perfilSeleccionado.conocimientos.sort((a: Conocimiento, b: Conocimiento) => (a.tipo.nombre === b.tipo.nombre) ? -(a.nivel - b.nivel) : a.tipo.nombre.localeCompare(b.tipo.nombre));
    }
  }

  openModalCrearConocimiento(): void {
    const conocimiento = new Conocimiento();
    this.openModalModificarConocimiento(conocimiento);
  }

  openModalModificarConocimiento(conocimiento: Conocimiento): void {
    const modalRef = this.modalService.open(AdminConocimientoComponent, { size: 'lg' });
    modalRef.componentInstance.conocimiento = conocimiento;
    modalRef.dismissed.subscribe(
      data => {
        // cuando se cierre el modal actualizar lista
      }
    );
  }

  openModalModificarProyecto(proyecto: Proyecto): void {
    const modalRef = this.modalService.open(AdminProyectoComponent, { size: 'lg' });
    modalRef.componentInstance.proyecto = proyecto;
    modalRef.dismissed.subscribe(
      data => {
        // cuando se cierre el modal actualizar lista
      }
    );
  }

}
