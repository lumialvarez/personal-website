import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from 'app/_services/toast.service';
import {Project} from '../../../_models/main/Profile';

@Component({
  selector: 'app-admin-proyecto',
  templateUrl: './admin-proyecto.component.html',
  styleUrls: ['./admin-proyecto.component.css']
})
export class AdminProyectoComponent implements OnInit {

  public project: Project;
  public projectEdit: Project;

  constructor(public activeModal: NgbActiveModal, public toastService: ToastService) {
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
    fonts: [],
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
    console.log(this.project);
    this.projectEdit = new Project(this.project);
  }

  saveProject(): void {
    console.log(this.projectEdit);
    this.activeModal.dismiss(this.projectEdit);
  }

}
