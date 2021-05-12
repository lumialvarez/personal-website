import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalConstants } from 'app/common/global-constants';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiPerfilUrl: string = null;

  constructor(private httpClient: HttpClient) { 
    this.apiPerfilUrl = GlobalConstants.apiBasePath + GlobalConstants.perfilPath;
  }

  public getPerfiles(): Observable<any> {
    return this.httpClient.get<any>(this.apiPerfilUrl);
  }

  public getPerfilById(id: Int16Array): Observable<any> {
    return this.httpClient.get<any>(this.apiPerfilUrl + "/" + id);
  }
}
