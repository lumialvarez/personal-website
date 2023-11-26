import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AdminConocimientoComponent} from './admin-conocimiento/admin-conocimiento.component';
import {AdminProyectoComponent} from './admin-proyecto/admin-proyecto.component';
import {ProfileService} from '../../_services/http/profile/perfil.service';
import {Knowledge, Profile, Project} from '../../_models/main/Profile';
import {ToastService} from '../../_services/toast.service';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {

  constructor(private modalService: NgbModal, private profileService: ProfileService, private toastService: ToastService) {
  }

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
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.selectedProfile = null;
    this.profileService.getProfiles().subscribe(
      data => {
        this.profileList = data.profiles;
        if (this.profileList.length === 1) {
          this.selectedProfile = this.profileList[0];
          this.processSelectedProfile();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  processSelectedProfile(): void {
    this.selectedLanguage = this.selectedProfile.profileLanguage;
    this.selectedProfile.profileData.projects.sort((a: Project, b: Project) => -(b.order - a.order));
    this.orderKnowledges('nombre');
  }

  saveProfileData(): void {
    this.profileService.updateProfile(this.selectedProfile).subscribe(
      data => {
        this.toastService.showSuccess('Perfil Actualizado');
        this.selectedProfile = data.profile;
      },
      err => {
        err.error.details.forEach(detail => {
          this.toastService.showDanger(detail);
        });
      }
    );
  }

  processFilterKnowledgeName(knowledge: Knowledge, knowledgeFilter: string): boolean {
    if (!knowledge || !knowledgeFilter) {
      return true;
    }
    return knowledge.name.toLowerCase().includes(knowledgeFilter.toLowerCase());
  }

  orderKnowledges(filter: string): void {
    if (filter === 'nombre') {
      this.selectedProfile.profileData.knowledges.sort((a: Knowledge, b: Knowledge) => a.name.localeCompare(b.name));
    } else if (filter === 'nivel') {
      this.selectedProfile.profileData.knowledges.sort((a: Knowledge, b: Knowledge) => -(a.level - b.level));
    } else if (filter === 'tipoNivel') {
      // tslint:disable-next-line:max-line-length
      this.selectedProfile.profileData.knowledges.sort((a: Knowledge, b: Knowledge) => (a.type === b.type) ? -(a.level - b.level) : a.type.localeCompare(b.type));
    }
  }

  openModalCreateKnowledge(): void {
    const knowledge = new Knowledge();
    this.openModalUpdateKnowledge(knowledge);
  }

  openModalUpdateKnowledge(knowledge: Knowledge): void {
    const modalRef = this.modalService.open(AdminConocimientoComponent, {size: 'lg'});
    modalRef.componentInstance.knowledge = knowledge;
    modalRef.dismissed.subscribe(
      data => {
        // cuando se cierre el modal actualizar lista
        if (data) {
          const knowledgeModified = data as Knowledge;
          let exists = false;
          for (let i = 0; i < this.selectedProfile.profileData.knowledges.length; i++) {
            if (this.selectedProfile.profileData.knowledges[i].id === knowledgeModified.id) {
              this.selectedProfile.profileData.knowledges[i] = knowledgeModified;
              exists = true;
            }
          }
          if (!exists) {
            knowledgeModified.id = 0;
            this.selectedProfile.profileData.knowledges.push(knowledgeModified);
          }
        }
      }
    );
  }


  openModalCreateProject(): void {
    const project = new Project();
    this.openModalUpdateProject(project);
  }

  openModalUpdateProject(project: Project): void {
    const modalRef = this.modalService.open(AdminProyectoComponent, {size: 'lg'});
    modalRef.componentInstance.project = project;
    modalRef.dismissed.subscribe(
      data => {
        // cuando se cierre el modal actualizar lista
        if (data) {
          const projectModified = data as Project;
          let exists = false;
          for (let i = 0; i < this.selectedProfile.profileData.projects.length; i++) {
            if (this.selectedProfile.profileData.projects[i].id === projectModified.id) {
              this.selectedProfile.profileData.projects[i] = projectModified;
              exists = true;
            }
          }
          if (!exists) {
            this.selectedProfile.profileData.projects.push(projectModified);
          }
        }
      }
    );
  }

}
