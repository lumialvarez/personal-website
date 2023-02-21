import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../../_models/main/Profile';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {
  public escapedContent: string;
  public project: Project;
  public data: any = {};

  constructor(public activeModal: NgbActiveModal, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
}
