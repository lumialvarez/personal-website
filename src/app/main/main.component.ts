import {Component, HostListener, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DetalleProyectoComponent} from './detalle-proyecto/detalle-proyecto.component';

import {Knowledge, Profile, Project} from '../_models/main/Profile';
import {ProfileService} from '../_services/perfil.service';


declare var $: any;
declare var require: any;
const {version: appVersion} = require('../../../package.json');

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public profile: Profile = null;

  public version;
  public knowledgeLanguages: Knowledge[] = [];
  public knowledgeFrameworks: Knowledge[] = [];
  public knowledgeTools: Knowledge[] = [];
  public knowledgeOther: Knowledge[] = [];
  public categories: string[] = ['Fullstack', 'Backend', 'Integracion', 'Frontend', 'Infraestructura', 'Base de datos', 'Devops'];
  public selectedCategory: string = null;

  constructor(private modalService: NgbModal, private profileService: ProfileService) {
    this.version = appVersion;
  }

  @HostListener('document:scroll', ['$event'])
  onScroll = (ev: Event) => {
    this.actualizarEstilosContenido(ev);
  }

  @HostListener('document:resize', ['$event'])
  onResize = (ev: Event) => {
    this.actualizarEstilosContenido(ev);
  }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();

    this.loadProfile();
  }

  actualizarEstilosContenido = (s) => {
    // Color del menu
    const alturaPantalla = window.innerHeight;
    if (s && s.target && s.target.scrollingElement) {
      const pxScroll = s.target.scrollingElement.scrollTop;

      const alturaEsperada = alturaPantalla * 0.7;
      let estilo: string;
      if (pxScroll === 0) {
        estilo = 'background-color: transparent !important;';
      } else if (pxScroll > 0 && pxScroll <= alturaEsperada) {
        estilo = 'background-color: rgba(12, 36, 97,' + pxScroll / alturaEsperada + ') !important;';
      } else {
        estilo = 'background-color: rgba(12, 36, 97,1.0) !important;';
      }
      document.getElementById('navbarElement').setAttribute('style', estilo);
    }

    // Altura del nombre principal
    this.actualizarAlturaNombrePrincipal();
  }

  actualizarAlturaNombrePrincipal(): void {
    const alturaPantalla = window.innerHeight;
    if (document.getElementById('main-name-container')) {
      const alturaElemento = document.getElementById('main-name-container').clientHeight;
      const espacioTop = Math.round((alturaPantalla - (alturaElemento * 1.2)) / 2);

      document.getElementById('main-name-container').setAttribute('style', 'top: ' + espacioTop + 'px;');
    }
  }

  loadProfile(): void {
    this.profile = null;
    this.profileService.getProfilesExternal().subscribe({
      next: (data) => {
        console.log(data);
        this.profile = data.profiles[0];
        this.profile.profileData.projects.sort((a: Project, b: Project) => -(b.order - a.order));
        this.processKnowledge();
      },
      error: (e) => console.error(e),
      complete: () => this.actualizarAlturaNombrePrincipal()
    });
  }

  processKnowledge(): void {
    this.knowledgeLanguages = [];
    this.knowledgeFrameworks = [];
    this.knowledgeTools = [];
    this.knowledgeOther = [];

    for (const knowledge of this.profile.profileData.knowledges) {
      if (!this.selectedCategory || knowledge.categories.find((item) => item === this.selectedCategory)) {
        if (knowledge.type === 'Lenguaje') {
          this.knowledgeLanguages.push(knowledge);
        } else if (knowledge.type === 'Framework') {
          this.knowledgeFrameworks.push(knowledge);
        } else if (knowledge.type === 'Herramienta') {
          this.knowledgeTools.push(knowledge);
        } else if (knowledge.type === 'Otros') {
          this.knowledgeOther.push(knowledge);
        }
      }
    }

    this.knowledgeLanguages.sort((a, b) => -(a.level - b.level));
    this.knowledgeFrameworks.sort((a, b) => -(a.level - b.level));
    this.knowledgeTools.sort((a, b) => -(a.level - b.level));
    this.knowledgeOther.sort((a, b) => -(a.level - b.level));
  }

  openModalProjectDetail(project: Project): void {
    const modalRef = this.modalService.open(DetalleProyectoComponent, {size: 'lg'});
    modalRef.componentInstance.project = project;
  }
}
