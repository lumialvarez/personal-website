import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll(0, 1);
    window.scroll(0, 0);
  }

  moveToTag(nombreTag): void {
    let intentos = 0;
    setTimeout(function intento(): void {
      const elementoContenido = document.getElementById(nombreTag);
      if (typeof (elementoContenido) !== 'undefined' && elementoContenido != null) {
        elementoContenido.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      } else {
        if (intentos < 50) {
          intentos++;
          setTimeout(intento, 20);
        }
      }
    }, 20);
  }

  ejecutarMenu(): void {
    const elemento = document.getElementsByClassName('navbar-toggler');
    let estilo = '';
    if (elemento){
      if (elemento[0].classList.contains('collapsed')){
        console.log('cerrado');
        estilo = 'background-color: transparent !important;';
        window.scroll(window.pageXOffset, window.pageYOffset + 1);
        window.scroll(window.pageXOffset, window.pageYOffset - 1);
      } else {
        console.log('abierto');
        estilo = 'background-color: rgba(12, 36, 97,1.0) !important;';
      }
      document.getElementById('navbarElement').setAttribute('style', estilo);
    }

  }
}
