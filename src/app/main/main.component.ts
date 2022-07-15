import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';
import { PerfilService } from 'app/_services/perfil.service';
import { Perfil } from 'app/_models/main/perfil';
import { Conocimiento } from 'app/_models/main/conocimiento';
import { Proyecto } from 'app/_models/main/proyecto';
import { ConocimientoService } from 'app/_services/conocimiento.service';
import { CategoriaConocimiento } from 'app/_models/main/categoria-conocimiento';


declare var $: any;
declare var require: any;
const { version: appVersion } = require('../../../package.json');

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public perfil: Perfil = null;

  public version;
  public lenguajes: Conocimiento[] = [];
  public frameworks: Conocimiento[] = [];
  public herramientas: Conocimiento[] = [];
  public otros: Conocimiento[] = [];
  public categorias: CategoriaConocimiento[] = [];
  public categoriaSeleccionada: string = null;

  constructor(private modalService: NgbModal, private perfilService: PerfilService, public conocimientoService: ConocimientoService) {
    this.version = appVersion;
  }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
    window.addEventListener('scroll', this.actualizarEstilosContenido, true);
    window.addEventListener('resize', this.actualizarEstilosContenido, true);

    this.cargarDatosPerfil();
    this.cargarDatostipoConocimiento();
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

  cargarDatosPerfil(): void {
    this.perfil = null;
    this.perfilService.getPerfilExt().subscribe({
      next: (data) => {
        this.perfil = data[0];
        this.perfil.proyectos.sort((a: Proyecto, b: Proyecto) => -(b.id - a.id));
        this.procesarConocimientos();
      },
      error: (e) => console.error(e),
      complete: () => this.actualizarAlturaNombrePrincipal()
    });
  }

  cargarDatostipoConocimiento(): void {
    this.conocimientoService.getCategoriasConocimientoExt().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (e) => console.error(e)
    });
  }

  procesarConocimientos(): void {
    this.lenguajes = [];
    this.frameworks = [];
    this.herramientas = [];
    this.otros = [];

    for (const conocimiento of this.perfil.conocimientos) {
      if (!this.categoriaSeleccionada || conocimiento.categorias.find((item) => item.nombre === this.categoriaSeleccionada)) {
        if (conocimiento.tipo.nombre === 'Lenguaje') {
          this.lenguajes.push(conocimiento);
        } else if (conocimiento.tipo.nombre === 'Framework') {
          this.frameworks.push(conocimiento);
        } else if (conocimiento.tipo.nombre === 'Herramienta') {
          this.herramientas.push(conocimiento);
        } else if (conocimiento.tipo.nombre === 'Otros') {
          this.otros.push(conocimiento);
        }
      }
    }

    this.lenguajes.sort((a, b) => -(a.nivel - b.nivel));
    this.frameworks.sort((a, b) => -(a.nivel - b.nivel));
    this.herramientas.sort((a, b) => -(a.nivel - b.nivel));
    this.otros.sort((a, b) => -(a.nivel - b.nivel));
  }

  openModalDetalleProyecto(proyecto: any): void {
    const modalRef = this.modalService.open(DetalleProyectoComponent, { size: 'lg' });
    modalRef.componentInstance.proyecto = proyecto;
  }
}
