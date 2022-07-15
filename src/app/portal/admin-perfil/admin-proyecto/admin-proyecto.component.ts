import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'app/_models/main/proyecto';
import { ProyectoService } from 'app/_services/proyecto.service';
import { ToastService } from 'app/_services/toast.service';

@Component({
  selector: 'app-admin-proyecto',
  templateUrl: './admin-proyecto.component.html',
  styleUrls: ['./admin-proyecto.component.css']
})
export class AdminProyectoComponent implements OnInit {

  public proyecto: Proyecto;

  constructor(public activeModal: NgbActiveModal, public proyectoService: ProyectoService, public toastService: ToastService) { }

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
  }

  guardarProyecto(): void {
    console.log(this.proyecto);
    if (this.proyecto.id && this.proyecto.id > 0){
      this.proyectoService.updateProyecto(this.proyecto).subscribe(
        data => {
          this.toastService.showSuccess('Proyecto Actualizado');
          console.log(data);
          this.activeModal.dismiss('Update OK');
        },
        err => {
          err.error.details.forEach(detail => {
            this.toastService.showDanger(detail);
          });
        }
      );
    } else {
      this.proyectoService.saveProyecto(this.proyecto).subscribe(
        data => {
          this.toastService.showSuccess('Proyecto Creado');
          console.log(data);
          this.activeModal.dismiss('Save OK');
        },
        err => {
          err.error.details.forEach(detail => {
            this.toastService.showDanger(detail);
          });
        }
      );
    }
  }

}
