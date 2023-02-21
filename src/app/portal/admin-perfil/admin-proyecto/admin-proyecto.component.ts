import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'app/_services/toast.service';
import {Project} from '../../../_models/main/Profile';

@Component({
  selector: 'app-admin-proyecto',
  templateUrl: './admin-proyecto.component.html',
  styleUrls: ['./admin-proyecto.component.css']
})
export class AdminProyectoComponent implements OnInit {

  public project: Project;

  constructor(public activeModal: NgbActiveModal, public toastService: ToastService) { }

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
    console.log(this.project);
    /*
    if (this.project.id && this.project.id > 0){
      this.proyectoService.updateProyecto(this.project).subscribe(
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
      this.proyectoService.saveProyecto(this.project).subscribe(
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
    */
  }

}
