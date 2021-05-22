import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Conocimiento } from 'app/_models/main/conocimiento';
import { Perfil } from 'app/_models/main/perfil';
import { ConocimientoService } from 'app/_services/conocimiento.service';
import { PerfilService } from 'app/_services/perfil.service';
import { ToastService } from 'app/_services/toast.service';
import { AdminConocimientoComponent } from './admin-conocimiento/admin-conocimiento.component';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {
  public lstPerfiles: Perfil[];
  public perfilSeleccionado: Perfil = null;
  public idiomaSeleccionado: string = null;

  constructor(private modalService: NgbModal, private perfilService: PerfilService, private conocimientoService: ConocimientoService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.cargarDatosPerfil();
  }

  cargarDatosPerfil() {
    this.perfilService.getPerfiles().subscribe(
      data => {
        this.lstPerfiles = data;
        if(this.lstPerfiles.length == 1){
          this.perfilSeleccionado = this.lstPerfiles[0];
          this.procesarSeleccionPerfil();
        }
      },
      err => {
        console.log(err)
      }
    );
  }

  procesarSeleccionPerfil() {
    this.idiomaSeleccionado = this.perfilSeleccionado.idioma.nombre;
    this.perfilSeleccionado.conocimientos.sort(function (a, b) { return -( a.nivel - b.nivel) })
  }

  guardarCambiosPerfil() {
    this.perfilService.updatePerfil(this.perfilSeleccionado).subscribe(
      data => {
        this.toastService.showSuccess("Perfil Actualizado");
        console.log(data)
      },
      err => {
        err.error.details.forEach(detail => {
          this.toastService.showDanger(detail);
        });
      }
    )
  }

  openModalModificarConocimiento(conocimiento: Conocimiento) {
    const modalRef = this.modalService.open(AdminConocimientoComponent, { size: 'lg' });
    modalRef.componentInstance.conocimiento =  Object.create(conocimiento);
  }

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
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

}
