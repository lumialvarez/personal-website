import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GlobalConstants} from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly apiNotificationUrl: string = null;

  constructor(private httpClient: HttpClient) {
    this.apiNotificationUrl = GlobalConstants.notificationUserPath;
  }

  public SetReadNotification(id: Int32Array): Observable<any> {
    return this.httpClient.put(this.apiNotificationUrl + '/' + id , null);
  }
}
