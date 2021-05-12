import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Perfil } from 'app/_models/main/perfil';
import { PerfilService } from 'app/_services/perfil.service';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {
  public lstPerfiles: Perfil[];
  public perfilSeleccionado: Perfil = null;
  public idiomaSeleccionado: string = null;

  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.perfilService.getPerfiles().subscribe(
      data => {
        this.lstPerfiles = data;
      },
      err => {
        console.log(err)
      }
    )
  }

  procesarSeleccionPerfil() {
    this.idiomaSeleccionado = this.perfilSeleccionado.idioma.nombre;
  }

  guardarCambiosPerfil() {
    this.perfilService.updatePerfil(this.perfilSeleccionado).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err)
      }
    )
  }

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
