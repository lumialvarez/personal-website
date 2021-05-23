import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'app/common/global-constants';
import { Proyecto } from 'app/_models/main/proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiProyectoUrl: string = null;

  constructor(private httpClient: HttpClient) {
    this.apiProyectoUrl = GlobalConstants.apiIntBasePath + GlobalConstants.proyectoPath;
  }

  public getProyecto(id: Int32Array): Observable<Proyecto> {
    return this.httpClient.get<Proyecto>(this.apiProyectoUrl + "/" + id);
  }

  public getProyectos(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.apiProyectoUrl);
  }

  public saveProyecto(conocimiento: Proyecto): Observable<Proyecto> {
    return this.httpClient.post<Proyecto>(this.apiProyectoUrl, conocimiento);
  }

  public updateProyecto(conocimiento: Proyecto): Observable<Proyecto> {
    return this.httpClient.put<Proyecto>(this.apiProyectoUrl, conocimiento);
  }
}
