import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'app/_services/toast.service';
import { AdminConocimientoComponent } from './admin-conocimiento/admin-conocimiento.component';
import { AdminProyectoComponent } from './admin-proyecto/admin-proyecto.component';
import {ProfileService} from '../../_services/perfil.service';
import {Knowledge, Profile, Project} from '../../_models/main/Profile';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {

  constructor(private modalService: NgbModal, private profileService: ProfileService, private toastService: ToastService) { }
  public profileList: Profile[];
  public selectedProfile: Profile = null;
  public selectedLanguage: string = null;
  public knowledgeFilter = '';

  orderByNameIsChecked = false;

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
    this.selectedProfile = null;
    this.profileService.getProfiles().subscribe(
      data => {
        this.profileList = data.profiles;
        if (this.profileList.length === 1) {
          this.selectedProfile = this.profileList[0];
          this.procesarSeleccionPerfil();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  procesarSeleccionPerfil(): void {
    this.selectedLanguage = this.selectedProfile.profileLanguage;
    this.selectedProfile.profileData.projects.sort((a: Project, b: Project) => -(b.order - a.order));
    this.ordenarConocimientos('nombre');
  }

  guardarCambiosPerfil(): void {
    this.profileService.updateProfile(this.selectedProfile).subscribe(
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
      this.selectedProfile.profileData.knowledges.sort((a: Knowledge, b: Knowledge) => a.name.localeCompare(b.name));
    } else if (filtro === 'nivel') {
      this.selectedProfile.profileData.knowledges.sort((a: Knowledge, b: Knowledge) => -(a.level - b.level));
    }else if (filtro === 'tipoNivel') {
      // tslint:disable-next-line:max-line-length
      this.selectedProfile.profileData.knowledges.sort((a: Knowledge, b: Knowledge) => (a.type === b.type) ? -(a.level - b.level) : a.type.localeCompare(b.type));
    }
  }

  openModalCreateKnowledge(): void {
    const knowledge = new Knowledge();
    this.openModalUpdateKnowledge(knowledge);
  }

  openModalUpdateKnowledge(knowledge: Knowledge): void {
    const modalRef = this.modalService.open(AdminConocimientoComponent, { size: 'lg' });
    modalRef.componentInstance.conocimiento = knowledge;
    modalRef.dismissed.subscribe(
      data => {
        // cuando se cierre el modal actualizar lista
      }
    );
  }

  openModalUpdateProject(project: Project): void {
    const modalRef = this.modalService.open(AdminProyectoComponent, { size: 'lg' });
    modalRef.componentInstance.proyecto = project;
    modalRef.dismissed.subscribe(
      data => {
        // cuando se cierre el modal actualizar lista
      }
    );
  }

}
