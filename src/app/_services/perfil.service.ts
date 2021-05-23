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
  private apiPerfilExternalUrl: string = null;

  constructor(private httpClient: HttpClient) { 
    this.apiPerfilUrl = GlobalConstants.apiIntBasePath + GlobalConstants.perfilPath;
    this.apiPerfilExternalUrl = GlobalConstants.apiExtBasePath + GlobalConstants.perfilPath;
  }

  public getPerfilExt(): Observable<Perfil[]> {
    return this.httpClient.get<Perfil[]>(this.apiPerfilExternalUrl);
  }

  public getPerfiles(): Observable<Perfil[]> {
    return this.httpClient.get<Perfil[]>(this.apiPerfilUrl);
  }

  public getPerfilById(id: number): Observable<Perfil> {
    return this.httpClient.get<Perfil>(this.apiPerfilUrl + "/" + id);
  }

  public updatePerfil(perfil: Perfil): Observable<any> {
    return this.httpClient.put<any>(this.apiPerfilUrl, perfil);
  }
}
