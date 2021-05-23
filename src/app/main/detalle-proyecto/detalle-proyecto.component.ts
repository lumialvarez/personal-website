import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {
  public contenidoEscapado:string
   
  public proyecto:any;
  public datos:any = {};

  constructor(public activeModal: NgbActiveModal, private httpClient: HttpClient,  private FormsModule: FormsModule) { }

  ngOnInit(): void {
  }
}
