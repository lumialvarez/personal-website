import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { version } from '../../../package.json';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';
import { PerfilService } from 'app/_services/perfil.service';
import { Perfil } from 'app/_models/main/perfil';
import { Conocimiento } from 'app/_models/main/conocimiento';
import { Proyecto } from 'app/_models/main/proyecto';
import { ConocimientoService } from 'app/_services/conocimiento.service';
import { CategoriaConocimiento } from 'app/_models/main/categoria-conocimiento';


declare var $: any;

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
    this.version = version
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
    let alturaPantalla = window.innerHeight
    if (s && s.target && s.target.scrollingElement) {
      let pxScroll = s.target.scrollingElement.scrollTop;

      let alturaEsperada = alturaPantalla * 0.7;
      let estilo = "";
      if (pxScroll == 0) {
        estilo = "background-color: transparent !important;";
      } else if (pxScroll > 0 && pxScroll <= alturaEsperada) {
        estilo = "background-color: rgba(12, 36, 97," + pxScroll / alturaEsperada + ") !important;";
      } else {
        estilo = "background-color: rgba(12, 36, 97,1.0) !important;";
      }
      document.getElementById('navbarElement').setAttribute("style", estilo);
    }

    //Altura del nombre principal
    let alturaElemento = document.getElementById('main-name-container').clientHeight
    let espacioTop = Math.round((alturaPantalla - (alturaElemento * 1.2)) / 2)

    document.getElementById('main-name-container').setAttribute("style", 'top: ' + espacioTop + 'px;');

  }

  cargarDatosPerfil() {
    this.perfil = null;
    this.perfilService.getPerfilExt().subscribe(
      data => {
          this.perfil = data[0];
          this.perfil.proyectos.sort((a: Proyecto, b: Proyecto) => -(b.id - a.id));
          this.procesarConocimientos();
      },
      err => {
        console.log(err)
      }
    );
  }

  cargarDatostipoConocimiento(){
    this.conocimientoService.getCategoriasConocimientoExt().subscribe(
      data => {
          this.categorias = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  procesarConocimientos() {
    this.lenguajes = [];
    this.frameworks = [];
    this.herramientas = [];
    this.otros = [];

    for (let i = 0; i < this.perfil.conocimientos.length; i++) {
      if (!this.categoriaSeleccionada || this.perfil.conocimientos[i].categorias.find((item) => item.nombre === this.categoriaSeleccionada)   ) {
        if (this.perfil.conocimientos[i].tipo.nombre == "Lenguaje") {
          this.lenguajes.push(this.perfil.conocimientos[i])
        } else if (this.perfil.conocimientos[i].tipo.nombre == "Framework") {
          this.frameworks.push(this.perfil.conocimientos[i])
        } else if (this.perfil.conocimientos[i].tipo.nombre == "Herramienta") {
          this.herramientas.push(this.perfil.conocimientos[i])
        } else if (this.perfil.conocimientos[i].tipo.nombre == "Otros") {
          this.otros.push(this.perfil.conocimientos[i])
        }
      }
    }

    this.lenguajes.sort((a, b) => -(a.nivel - b.nivel))
    this.frameworks.sort((a, b) => -(a.nivel - b.nivel))
    this.herramientas.sort((a, b) => -(a.nivel - b.nivel))
    this.otros.sort((a, b) => -(a.nivel - b.nivel))
  }

  openModalDetalleProyecto(proyecto: any) {
    const modalRef = this.modalService.open(DetalleProyectoComponent, { size: 'lg' });
    modalRef.componentInstance.proyecto = proyecto;
  }
}
