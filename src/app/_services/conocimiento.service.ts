import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'app/common/global-constants';
import { Conocimiento } from 'app/_models/main/conocimiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConocimientoService {
  private apiConocimientoUrl: string = null;

  constructor(private httpClient: HttpClient) { 
    this.apiConocimientoUrl = GlobalConstants.apiIntBasePath + GlobalConstants.conocimientoPath;
  }

  public getConocimientos(): Observable<Conocimiento[]> {
    return this.httpClient.get<Conocimiento[]>(this.apiConocimientoUrl);
  }
}
