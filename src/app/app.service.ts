import { Injectable, ElementRef } from '@angular/core';
import { Subject } from "rxjs";
@Injectable()
export class AppService {
  private isOpen = new Subject<boolean>();

  public toggleMenu(isOpen: boolean) {
    return this.isOpen.next(isOpen);
  }

  public onToggleMenu() {
    return this.isOpen;
  }
}