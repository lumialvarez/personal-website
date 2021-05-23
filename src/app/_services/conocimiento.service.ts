import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'app/common/global-constants';
import { CategoriaConocimiento } from 'app/_models/main/categoria-conocimiento';
import { Conocimiento } from 'app/_models/main/conocimiento';
import { TipoConocimiento } from 'app/_models/main/tipo-conocimiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConocimientoService {
  private apiConocimientoUrl: string = null;
  private apiConocimientoCategoriaUrl: string = null;
  private apiConocimientoTipoUrl: string = null;

  constructor(private httpClient: HttpClient) { 
    this.apiConocimientoUrl = GlobalConstants.apiIntBasePath + GlobalConstants.conocimientoPath;
    this.apiConocimientoCategoriaUrl = GlobalConstants.apiIntBasePath + GlobalConstants.conocimientoCategoriaPath;
    this.apiConocimientoTipoUrl = GlobalConstants.apiIntBasePath + GlobalConstants.conocimientoTipoPath;
  }

  public getConocimiento(id: Int32Array): Observable<Conocimiento> {
    return this.httpClient.get<Conocimiento>(this.apiConocimientoUrl + "/" + id);
  }

  public getConocimientos(): Observable<Conocimiento[]> {
    return this.httpClient.get<Conocimiento[]>(this.apiConocimientoUrl);
  }

  public saveConocimiento(conocimiento: Conocimiento): Observable<Conocimiento> {
    return this.httpClient.post<Conocimiento>(this.apiConocimientoUrl, conocimiento);
  }

  public updateConocimiento(conocimiento: Conocimiento): Observable<Conocimiento> {
    return this.httpClient.put<Conocimiento>(this.apiConocimientoUrl, conocimiento);
  }

  public getCategoriasConocimiento(): Observable<CategoriaConocimiento[]> {
    return this.httpClient.get<CategoriaConocimiento[]>(this.apiConocimientoCategoriaUrl);
  }

  public getTiposConocimiento(): Observable<TipoConocimiento[]> {
    return this.httpClient.get<TipoConocimiento[]>(this.apiConocimientoTipoUrl);
  }
}
