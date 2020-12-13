import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrolling, true)
  }

  scrolling=(s)=>{
    let pxScroll = s.target.scrollingElement.scrollTop;
    let alturaPantalla = window.innerHeight
    let alturaEsperada = alturaPantalla * 0.7;
    let estilo = "";
    if (pxScroll == 0) {
      estilo = "background-color: transparent !important;";
    } else if (pxScroll > 0 && pxScroll <= alturaEsperada){
      estilo = "background-color: rgba(12, 36, 97," + pxScroll / alturaEsperada +") !important;";
    } else {
      estilo = "background-color: rgba(12, 36, 97,1.0) !important;";
    }
    document.getElementById('navbarElement').setAttribute("style", estilo);
  }

}
