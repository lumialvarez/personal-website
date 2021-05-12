import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalConstants } from 'app/common/global-constants';
import { Observable } from 'rxjs/internal/Observable';
import { Perfil } from 'app/_models/main/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiPerfilUrl: string = null;

  constructor(private httpClient: HttpClient) { 
    this.apiPerfilUrl = GlobalConstants.apiBasePath + GlobalConstants.perfilPath;
  }

  public getPerfiles(): Observable<Perfil[]> {
    return this.httpClient.get<Perfil[]>(this.apiPerfilUrl);
  }

  public getPerfilById(id: Int16Array): Observable<Perfil> {
    return this.httpClient.get<Perfil>(this.apiPerfilUrl + "/" + id);
  }

  public updatePerfil(perfil: Perfil): Observable<any> {
    return this.httpClient.put<any>(this.apiPerfilUrl, perfil);
  }
}
