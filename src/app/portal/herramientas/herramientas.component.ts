import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../_services/token.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})
export class HerramientasComponent implements OnInit {
  public token: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
  }

}
