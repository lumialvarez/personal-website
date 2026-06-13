import {Component, DestroyRef, OnInit, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
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

  private readonly destroyRef = inject(DestroyRef);

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
    this.profileService.getProfiles()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.profileList = data.profiles;
          if (this.profileList.length === 1) {
            this.selectedProfile = this.profileList[0];
            this.processSelectedProfile();
          }
        },
        error: (err) => console.error(err)
      });
  }

  processSelectedProfile(): void {
    this.selectedLanguage = this.selectedProfile.profileLanguage;
    this.selectedProfile.profileData.projects.sort((a: Project, b: Project) => -(b.order - a.order));
    this.orderKnowledges('nombre');
  }

  saveProfileData(): void {
    this.profileService.updateProfile(this.selectedProfile)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.toastService.showSuccess('Perfil Actualizado');
          this.selectedProfile = data.profile;
        },
        error: (err) => {
          (err?.error?.details || []).forEach((detail: string) => {
            this.toastService.showDanger(detail);
          });
        }
      });
  }

  processFilterKnowledgeName(knowledge: Knowledge, knowledgeFilter: string): boolean {
    if (!knowledge || !knowledgeFilter) {
      return true;
    }
    return knowledge.name.toLowerCase().includes(knowledgeFilter.toLowerCase());
  }

  orderKnowledges(filter: string): void {
    if (!this.selectedProfile) {
      return;
    }
    if (filter === 'nombre') {
      this.selectedProfile.profileData.knowledges.sort((a: Knowledge, b: Knowledge) => a.name.localeCompare(b.name));
    } else if (filter === 'nivel') {
      this.selectedProfile.profileData.knowledges.sort((a: Knowledge, b: Knowledge) => -(a.level - b.level));
    } else if (filter === 'tipoNivel') {
      this.selectedProfile.profileData.knowledges.sort((a: Knowledge, b: Knowledge) =>
        (a.type === b.type) ? -(a.level - b.level) : a.type.localeCompare(b.type)
      );
    }
  }

  openModalCreateKnowledge(): void {
    const knowledge = new Knowledge();
    this.openModalUpdateKnowledge(knowledge);
  }

  openModalUpdateKnowledge(knowledge: Knowledge): void {
    const modalRef = this.modalService.open(AdminConocimientoComponent, {size: 'lg'});
    modalRef.componentInstance.knowledge = knowledge;
    modalRef.dismissed
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data) {
          const knowledgeModified = data as Knowledge;
          const existing = this.selectedProfile.profileData.knowledges
            .findIndex((k) => k.id === knowledgeModified.id);
          if (existing >= 0) {
            this.selectedProfile.profileData.knowledges[existing] = knowledgeModified;
          } else {
            knowledgeModified.id = 0;
            this.selectedProfile.profileData.knowledges.push(knowledgeModified);
          }
        }
      });
  }


  openModalCreateProject(): void {
    const project = new Project();
    this.openModalUpdateProject(project);
  }

  openModalUpdateProject(project: Project): void {
    const modalRef = this.modalService.open(AdminProyectoComponent, {size: 'lg'});
    modalRef.componentInstance.project = project;
    modalRef.dismissed
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data) {
          const projectModified = data as Project;
          const existing = this.selectedProfile.profileData.projects
            .findIndex((p) => p.id === projectModified.id);
          if (existing >= 0) {
            this.selectedProfile.profileData.projects[existing] = projectModified;
          } else {
            this.selectedProfile.profileData.projects.push(projectModified);
          }
        }
      });
  }

}
