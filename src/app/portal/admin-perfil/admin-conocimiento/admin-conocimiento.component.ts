import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaConocimiento } from 'app/_models/main/categoria-conocimiento';
import { Conocimiento } from 'app/_models/main/conocimiento';
import { TipoConocimiento } from 'app/_models/main/tipo-conocimiento';
import { ConocimientoService } from 'app/_services/conocimiento.service';
import { ToastService } from 'app/_services/toast.service';

@Component({
  selector: 'app-admin-conocimiento',
  templateUrl: './admin-conocimiento.component.html',
  styleUrls: ['./admin-conocimiento.component.css']
})
export class AdminConocimientoComponent implements OnInit {

  public conocimiento: Conocimiento;
  public categoriasConocimiento: any[];
  public tiposConocimiento: TipoConocimiento[];

  constructor(public activeModal: NgbActiveModal, public conocimientoService: ConocimientoService, public toastService: ToastService) { }

  ngOnInit(): void {
    this.cargarCategoriasConocimiento();
    this.cargarTiposConocimiento();
  }

  cargarCategoriasConocimiento() {
    this.conocimientoService.getCategoriasConocimiento().subscribe(
      data => {
        this.categoriasConocimiento = data;
        this.categoriasConocimiento.forEach(item => {
          item.isChecked = false;
          this.conocimiento.categorias.forEach(item2 => {
            if(item.id === item2.id){
              item.isChecked = true;
            }
          });
        });
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

  onChangeCategoria(categoria: any, isChecked: boolean) {
    let categoriaConocimiento: CategoriaConocimiento = new CategoriaConocimiento(categoria);
    if (isChecked) {
      this.conocimiento.categorias.push(categoriaConocimiento);
    } else {
      let index = this.conocimiento.categorias.findIndex((item)=> item.id === categoriaConocimiento.id);
      this.conocimiento.categorias.splice(index,1);
    }
  }

  guardarConocimiento() {
    console.log(this.conocimiento);
    if(this.conocimiento.id && this.conocimiento.id > 0){
      this.conocimientoService.updateConocimiento(this.conocimiento).subscribe(
        data => {
          this.toastService.showSuccess("Conocimiento Actualizado");
          console.log(data);
          this.activeModal.dismiss("Update OK");
        }, 
        err => {
          err.error.details.forEach(detail => {
            this.toastService.showDanger(detail);
          });
        }
      )
    } else {
      this.conocimientoService.saveConocimiento(this.conocimiento).subscribe(
        data => {
          this.toastService.showSuccess("Conocimiento Creado");
          console.log(data);
          this.activeModal.dismiss("Save OK");
        }, 
        err => {
          err.error.details.forEach(detail => {
            this.toastService.showDanger(detail);
          });
        }
      )
    }
  }

}
