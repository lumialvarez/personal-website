import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {ProfileResponse} from './dto/profile-response';
import {SaveProfileRequest} from './dto/save-profile-request';
import {SaveProfileResponse} from './dto/save-profile-response';
import {Profile} from '../_models/main/Profile';
import {GlobalConstants} from '../common/global-constants';

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

  public updateProfile(profile: Profile): Observable<SaveProfileResponse> {
    const saveProfileRequest: SaveProfileRequest = new SaveProfileRequest();
    saveProfileRequest.profile = profile;
    return this.httpClient.put<any>(this.profileInternalPath, saveProfileRequest);
  }
}
