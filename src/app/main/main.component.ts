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
    this.httpClient.get("assets/misc/conocimientos.json").subscribe((data:any) =>{
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if(data[i].tipo == "Lenguaje"){
          this.lenguajes.push(data[i])
        } else if(data[i].tipo == "Framework"){
          this.frameworks.push(data[i])
        } else if(data[i].tipo == "Herramienta"){
          this.herramientas.push(data[i])
        }
      }
    })
  }
}
