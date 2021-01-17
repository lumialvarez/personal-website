import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public lenguajes: any[] = [];
  public frameworks: any[] = [];
  public herramientas: any[] = [];
  public resumenProyectos: any[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.actualizarEstilosContenido, true)
    window.addEventListener('resize', this.actualizarEstilosContenido, true)

    this.procesarConocimientos()
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
    let espacioTop = Math.round((alturaPantalla - (alturaElemento*1.2)) / 2)

    document.getElementById('main-name-container').setAttribute("style", 'top: ' + espacioTop + 'px;');
  }

  procesarConocimientos() {
    console.log("Procesando conocimientos")
    this.httpClient.get("assets/misc/datosBackendTmp.json").subscribe((data:any) =>{
      let conocimientos = data.conocimientos
      console.log(conocimientos);
      for (let i = 0; i < conocimientos.length; i++) {
        if(conocimientos[i].tipo == "Lenguaje"){
          this.lenguajes.push(conocimientos[i])
        } else if(conocimientos[i].tipo == "Framework"){
          this.frameworks.push(conocimientos[i])
        } else if(conocimientos[i].tipo == "Herramienta"){
          this.herramientas.push(conocimientos[i])
        }
      }

      this.lenguajes.sort(function(a,b){return -(a.nivel - b.nivel)})
      this.frameworks.sort(function(a,b){return -(a.nivel - b.nivel)})
      this.herramientas.sort(function(a,b){return -(a.nivel - b.nivel)})

      this.resumenProyectos = data.poyectos
    })
  }


}
