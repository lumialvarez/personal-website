import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PerfilService } from 'app/_services/perfil.service';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {
  public data: any;

  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.perfilService.getPerfiles().subscribe(
      dataUser => {
        console.log(dataUser);
      },
      err => {
        console.log(err)
      }
    )
  }

  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
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
