import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaConocimiento } from 'app/_models/main/categoria-conocimiento';
import { Conocimiento } from 'app/_models/main/conocimiento';
import { TipoConocimiento } from 'app/_models/main/tipo-conocimiento';
import { ConocimientoService } from 'app/_services/conocimiento.service';

@Component({
  selector: 'app-admin-conocimiento',
  templateUrl: './admin-conocimiento.component.html',
  styleUrls: ['./admin-conocimiento.component.css']
})
export class AdminConocimientoComponent implements OnInit {

  public conocimiento: Conocimiento;
  public categoriasConocimiento: CategoriaConocimiento[];
  public tiposConocimiento: TipoConocimiento[];


  constructor(public activeModal: NgbActiveModal, public conocimientoService: ConocimientoService) { }

  ngOnInit(): void {
    this.cargarCategoriasConocimiento();
    this.cargarTiposConocimiento();
  }

  cargarCategoriasConocimiento() {
    this.conocimientoService.getCategoriasConocimiento().subscribe(
      data => {
        this.categoriasConocimiento = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  cargarTiposConocimiento() {
    this.conocimientoService.getTiposConocimiento().subscribe(
      data => {
        this.tiposConocimiento = data;
      },
      err => {
        console.log(err)
      }
    );
  }

}
