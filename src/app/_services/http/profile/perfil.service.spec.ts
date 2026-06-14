import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProfileService } from './perfil.service';
import { GlobalConstants } from '../../../common/global-constants';
import { Profile, ProfileData } from '../../../_models/main/Profile';
import { SaveProfileRequest } from './dto/save-profile-request';
import { SaveProfileResponse } from './dto/save-profile-response';
import { ProfileResponse } from './dto/profile-response';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  const buildProfile = (id: number): Profile => {
    const p = new Profile();
    p.profileId = id;
    p.profileLanguage = 'es';
    p.profileData = new ProfileData();
    p.profileData.name = `Profile ${id}`;
    p.status = true;
    return p;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });

    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProfilesExternal should GET the external profile endpoint', () => {
    const mockResponse: ProfileResponse = { profiles: [buildProfile(1), buildProfile(2)] };

    let actual: ProfileResponse | undefined;
    service.getProfilesExternal().subscribe(r => (actual = r));

    const req = httpMock.expectOne(
      r => r.method === 'GET' && r.url === GlobalConstants.profileExternalPath
    );
    req.flush(mockResponse);

    expect(actual).toEqual(mockResponse);
  });

  it('getProfiles should GET the internal profile endpoint', () => {
    const mockResponse: ProfileResponse = { profiles: [buildProfile(3)] };

    let actual: ProfileResponse | undefined;
    service.getProfiles().subscribe(r => (actual = r));

    const req = httpMock.expectOne(
      r => r.method === 'GET' && r.url === GlobalConstants.profileInternalPath
    );
    req.flush(mockResponse);

    expect(actual).toEqual(mockResponse);
  });

  it('getProfileById should GET the profile path with the id appended', () => {
    const mockProfile = buildProfile(42);

    let actual: Profile | undefined;
    service.getProfileById(42).subscribe(p => (actual = p));

    const req = httpMock.expectOne(
      r => r.method === 'GET' && r.url === `${GlobalConstants.profileInternalPath}/42`
    );
    req.flush(mockProfile);

    expect(actual).toEqual(mockProfile);
  });

  it('updateProfile should PUT a SaveProfileRequest wrapping the profile', () => {
    const profile = buildProfile(5);
    const mockResponse: SaveProfileResponse = { profile };

    let actual: SaveProfileResponse | undefined;
    service.updateProfile(profile).subscribe(r => (actual = r));

    const req = httpMock.expectOne(
      r => r.method === 'PUT' && r.url === GlobalConstants.profileInternalPath
    );
    expect(req.request.body).toEqual(jasmine.any(SaveProfileRequest));
    expect((req.request.body as SaveProfileRequest).profile).toBe(profile);
    req.flush(mockResponse);

    expect(actual).toEqual(mockResponse);
  });
});
