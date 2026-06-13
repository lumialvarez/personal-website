import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const navbar = document.getElementById('navbarElement');
    if (!navbar) {
      return;
    }
    navbar.classList.toggle('is-scrolled', window.scrollY > 60);
  }

  moveToTag(nombreTag: string): void {
    const target = document.getElementById(nombreTag);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ejecutarMenu(): void {
    const elemento = document.getElementsByClassName('navbar-toggler');
    if (elemento && elemento.length) {
      if (elemento[0].classList.contains('collapsed')) {
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
      }
    }
  }
}
