import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalConstants} from 'app/common/global-constants';
import {Observable} from 'rxjs';

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
