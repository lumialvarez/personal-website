import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {Observable} from 'rxjs/internal/Observable';
import {ListResponse} from './dto/list-response';

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly apiUserUrl: string = null;
  constructor(private httpClient: HttpClient) {
    this.apiUserUrl = GlobalConstants.userPath;
  }

  public getUsers(): Observable<ListResponse> {
    return this.httpClient.get<ListResponse>(this.apiUserUrl);
  }
}
