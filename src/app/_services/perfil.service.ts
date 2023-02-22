import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from 'app/common/global-constants';
import {Observable} from 'rxjs/internal/Observable';
import {Profile} from 'app/_models/main/profile';
import {ProfileResponse} from './dto/profile-response';
import {SaveProfileRequest} from './dto/save-profile-request';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly profileInternalPath: string = null;
  private readonly profileExternalPath: string = null;

  constructor(private httpClient: HttpClient) {
    this.profileInternalPath = GlobalConstants.profileInternalPath;
    this.profileExternalPath = GlobalConstants.profileExternalPath;
  }

  public getProfilesExternal(): Observable<ProfileResponse> {
    return this.httpClient.get<ProfileResponse>(this.profileExternalPath);
  }

  public getProfiles(): Observable<ProfileResponse> {
    return this.httpClient.get<ProfileResponse>(this.profileInternalPath);
  }

  public getProfileById(id: number): Observable<Profile> {
    return this.httpClient.get<Profile>(this.profileInternalPath + '/' + id);
  }

  public updateProfile(profile: Profile): Observable<any> {
    const saveProfileRequest: SaveProfileRequest = new SaveProfileRequest();
    saveProfileRequest.profile = profile;
    return this.httpClient.put<any>(this.profileInternalPath, saveProfileRequest);
  }
}
