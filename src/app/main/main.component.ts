import {ChangeDetectorRef, Component, DestroyRef, HostListener, OnInit, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DetalleProyectoComponent} from './detalle-proyecto/detalle-proyecto.component';
import {RevealDirective} from '../_directives/reveal.directive';
import {ScrollTopComponent} from '../shared/scroll-top/scroll-top.component';

import {Knowledge, Profile, Project} from '../_models/main/Profile';
import {ProfileService} from '../_services/http/profile/perfil.service';
import {APP_VERSION} from '../common/app-version';

declare var $: any;

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public profile: Profile = null;
  public loading = true;
  public loadError: string | null = null;

  public readonly version = inject(APP_VERSION);
  public currentYear = new Date().getFullYear();
  public knowledgeLanguages: Knowledge[] = [];
  public knowledgeFrameworks: Knowledge[] = [];
  public knowledgeTools: Knowledge[] = [];
  public knowledgeOther: Knowledge[] = [];
  public categories: string[] = ['Fullstack', 'Backend', 'Integracion', 'Frontend', 'Infraestructura', 'Base de datos', 'Devops'];
  public selectedCategory: string = null;

  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(private modalService: NgbModal, private profileService: ProfileService) {}

  @HostListener('document:scroll', ['$event'])
  onScroll(ev: Event): void {
    this.actualizarEstilosContenido(ev);
  }

  @HostListener('document:resize', ['$event'])
  onResize(ev: Event): void {
    this.actualizarEstilosContenido(ev);
  }

  ngOnInit(): void {
    if (typeof $ === 'function') {
      try {
        $('[data-toggle="tooltip"]').tooltip();
      } catch (e) {
        console.warn('Tooltip init failed (jQuery missing?)', e);
      }
    }
    this.loadProfile();
  }

  actualizarEstilosContenido(s): void {
    const alturaPantalla = window.innerHeight;
    if (s && s.target && s.target.scrollingElement) {
      const pxScroll = s.target.scrollingElement.scrollTop;

      const alturaEsperada = alturaPantalla * 0.7;
      let estilo: string;
      if (pxScroll === 0) {
        estilo = 'background-color: transparent !important;';
      } else if (pxScroll > 0 && pxScroll <= alturaEsperada) {
        estilo = 'background-color: rgba(var(--color-primary-rgb),' + pxScroll / alturaEsperada + ') !important;';
      } else {
        estilo = 'background-color: var(--color-primary) !important;';
      }
      document.getElementById('navbarElement')?.setAttribute('style', estilo);
    }

    this.actualizarAlturaNombrePrincipal();
  }

  actualizarAlturaNombrePrincipal(): void {
    const alturaPantalla = window.innerHeight;
    const container = document.getElementById('main-name-container');
    if (container) {
      const alturaElemento = container.clientHeight;
      const espacioTop = Math.round((alturaPantalla - (alturaElemento * 1.2)) / 2);
      container.setAttribute('style', 'top: ' + espacioTop + 'px;');
    }
  }

  loadProfile(): void {
    console.log('[MainComponent] loadProfile() called');
    this.profile = null;
    this.loading = true;
    this.loadError = null;

    this.profileService.getProfilesExternal()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          console.log('[MainComponent] finalize: setting loading=false and triggering CD');
          this.loading = false;
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          console.log('[MainComponent] next: data received', { hasProfiles: !!data?.profiles, count: data?.profiles?.length });
          try {
            this.profile = data?.profiles?.[0] ?? null;
            if (this.profile) {
              console.log('[MainComponent] profile loaded:', { name: this.profile.profileData?.name, hasProjects: !!this.profile.profileData?.projects, hasKnowledges: !!this.profile.profileData?.knowledges });
              if (this.profile.profileData?.projects) {
                this.profile.profileData.projects.sort((a: Project, b: Project) => -(b.order - a.order));
              }
              this.processKnowledge();
            } else {
              console.warn('[MainComponent] no profile in response');
              this.loadError = 'No se encontró un perfil para mostrar.';
            }
          } catch (err) {
            console.error('[MainComponent] error processing profile data', err);
            this.loadError = 'Los datos del perfil tienen un formato inesperado.';
          }
          this.cdr.markForCheck();
        },
        error: (e) => {
          console.error('[MainComponent] HTTP error cargando perfil externo', e);
          this.loadError = 'No se pudo cargar el perfil. Verificá tu conexión o intentá más tarde.';
          this.cdr.markForCheck();
        },
        complete: () => {
          console.log('[MainComponent] complete');
          this.actualizarAlturaNombrePrincipal();
        }
      });
  }

  processKnowledge(): void {
    if (!this.profile?.profileData?.knowledges) {
      return;
    }
    this.knowledgeLanguages = [];
    this.knowledgeFrameworks = [];
    this.knowledgeTools = [];
    this.knowledgeOther = [];

    for (const knowledge of (this.profile.profileData.knowledges || [])) {
      const hasCategory = Array.isArray(knowledge.categories)
        && knowledge.categories.some((item) => item === this.selectedCategory);
      if (!this.selectedCategory || hasCategory) {
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

    const byLevelDesc = (a: Knowledge, b: Knowledge) => (b.level ?? 0) - (a.level ?? 0);
    this.knowledgeLanguages.sort(byLevelDesc);
    this.knowledgeFrameworks.sort(byLevelDesc);
    this.knowledgeTools.sort(byLevelDesc);
    this.knowledgeOther.sort(byLevelDesc);
  }

  openModalProjectDetail(project: Project): void {
    const modalRef = this.modalService.open(DetalleProyectoComponent, {size: 'lg'});
    modalRef.componentInstance.project = project;
  }
}
