import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //document.getElementById("top").scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    window.scroll(0,0);
  }

  moveToTag(nombreTag) {
    let elementoContenido = document.getElementById(nombreTag);
    if (typeof (elementoContenido) != 'undefined' && elementoContenido != null) {
      elementoContenido.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    } else {
      setTimeout(function () { 
        document.getElementById(nombreTag).scrollIntoView(
          { behavior: "smooth", block: "center", inline: "center" });
        }, 500);
    }
  }

}
