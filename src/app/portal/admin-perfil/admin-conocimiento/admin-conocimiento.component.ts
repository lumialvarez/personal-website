import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from 'app/_services/toast.service';
import {Knowledge} from '../../../_models/main/Profile';

@Component({
  selector: 'app-admin-conocimiento',
  templateUrl: './admin-conocimiento.component.html',
  styleUrls: ['./admin-conocimiento.component.css']
})
export class AdminConocimientoComponent implements OnInit {

  private knowledgeCategoriesNames: string[] = ['Fullstack', 'Backend', 'Integracion', 'Frontend', 'Infraestructura', 'Base de datos', 'Devops'];
  public knowledge: Knowledge;
  public knowledgeEdit: Knowledge;
  public knowledgeCategories: any[] = [];
  public knowledgeTypes: string[] = ['Lenguaje', 'Framework', 'Herramienta', 'Otros'];

  constructor(public activeModal: NgbActiveModal, public toastService: ToastService) {
  }

  ngOnInit(): void {
    this.knowledgeCategories = [];
    for (const name of this.knowledgeCategoriesNames) {
      const knowledgeCategory: any = {};
      knowledgeCategory.name = name;
      knowledgeCategory.isChecked = this.knowledge.categories.includes(name);
      this.knowledgeCategories.push(knowledgeCategory);
    }
    this.knowledgeEdit = new Knowledge(this.knowledge);
  }

  compareKnowledgeType(tc1: any, tc2: any): boolean {
    return tc1 === tc2;
  }

  onChangeCategory(category: string, isChecked: boolean): void {
    if (isChecked) {
      this.knowledgeEdit.categories.push(category);
    } else {
      const index = this.knowledgeEdit.categories.findIndex((item) => item === category);
      this.knowledgeEdit.categories.splice(index, 1);
    }
    console.log(this.knowledgeEdit.categories);
    console.log(this.knowledge.categories);
  }

  saveKnowledge(): void {
    this.activeModal.dismiss(this.knowledgeEdit);
  }

}
