import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { version } from '../../../package.json';


declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public version;
  private conocimientos: any[] = [];
  public lenguajes: any[] = [];
  public frameworks: any[] = [];
  public herramientas: any[] = [];
  public otros: any[] = [];
  public resumenProyectos: any[] = [];
  public categorias: any[] = [];
  public categoriaSeleccionada: string = null;

  

  constructor(private httpClient: HttpClient) {
    this.version = version
  }
  

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
    window.addEventListener('scroll', this.actualizarEstilosContenido, true)
    window.addEventListener('resize', this.actualizarEstilosContenido, true)

    this.obtenerConocimientos()
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

  obtenerConocimientos() {
    console.log("Procesando conocimientos")
    this.httpClient.get("assets/misc/datosBackendTmp.json").subscribe((data: any) => {
      this.conocimientos = data.conocimientos

      for (let i = 0; i < this.conocimientos.length; i++) {
        for (let j = 0; j < this.conocimientos[i].categorias.length; j++) {
          let cat = this.conocimientos[i].categorias[j]
          if (!this.categorias.includes(cat)) {
            this.categorias.push(cat)
          }
        }
      }

      this.resumenProyectos = data.poyectos

      this.procesarConocimientos()
    })
  }


  procesarConocimientos() {
    console.log("Procesando conocimientos")
    this.lenguajes = [];
    this.frameworks = [];
    this.herramientas = [];
    this.otros = [];

    for (let i = 0; i < this.conocimientos.length; i++) {
      if (!this.categoriaSeleccionada || this.conocimientos[i].categorias.includes(this.categoriaSeleccionada)) {
        if (this.conocimientos[i].tipo == "Lenguaje") {
          this.lenguajes.push(this.conocimientos[i])
        } else if (this.conocimientos[i].tipo == "Framework") {
          this.frameworks.push(this.conocimientos[i])
        } else if (this.conocimientos[i].tipo == "Herramienta") {
          this.herramientas.push(this.conocimientos[i])
        } else if (this.conocimientos[i].tipo == "Otros") {
          this.otros.push(this.conocimientos[i])
        }
      }
    }

    this.lenguajes.sort(function (a, b) { return -(a.nivel - b.nivel) })
    this.frameworks.sort(function (a, b) { return -(a.nivel - b.nivel) })
    this.herramientas.sort(function (a, b) { return -(a.nivel - b.nivel) })
    this.otros.sort(function (a, b) { return -(a.nivel - b.nivel) })


  }


}
