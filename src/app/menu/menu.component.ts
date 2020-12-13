import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  moveToTag(nombreTag) {
    let intentos = 0;
    setTimeout(function intento() {
      let elementoContenido = document.getElementById(nombreTag);
      if (typeof (elementoContenido) != 'undefined' && elementoContenido != null) {
        elementoContenido.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      } else {
        if (intentos < 50) {
          intentos++;
          setTimeout(intento, 20);
        }
      }
    }, 20);
  }
}
