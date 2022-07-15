import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'app/common/global-constants';
import { Notificacion } from 'app/_models/notificacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private readonly apiNotificacionUrl: string = null;
  constructor(private httpClient: HttpClient) {
    this.apiNotificacionUrl = GlobalConstants.apiIntBasePath + GlobalConstants.notificacionPath;
  }

  public getUnreadNotificaciones(): Observable<Notificacion[]> {
    return this.httpClient.get<Notificacion[]>(this.apiNotificacionUrl + '/unread');
  }

  public PutReadNotificaciones(id: number): Observable<any> {
    return this.httpClient.put(this.apiNotificacionUrl + '/' + id + '/read', null);
  }
}
