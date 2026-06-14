import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { GlobalConstants } from '../../../common/global-constants';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService]
    });

    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('SetReadNotification should PUT to the notification endpoint with the id and a null body', () => {
    let actual: any;
    service.SetReadNotification(99).subscribe(res => (actual = res));

    const req = httpMock.expectOne(
      r => r.method === 'PUT' && r.url === `${GlobalConstants.notificationUserPath}/99`
    );
    expect(req.request.body).toBeNull();
    req.flush({ ok: true });

    expect(actual).toEqual({ ok: true });
  });
});
