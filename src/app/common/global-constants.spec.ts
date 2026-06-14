import { GlobalConstants } from './global-constants';

describe('GlobalConstants', () => {
  it('should expose the user endpoint under the authorization service path', () => {
    expect(GlobalConstants.userPath)
      .toBe('https://services.lmalvarez.com/authorization/api/v1/int/user');
  });

  it('should expose the login endpoint under the authorization service path', () => {
    expect(GlobalConstants.loginPath)
      .toBe('https://services.lmalvarez.com/authorization/api/v1/ext/user/login');
  });

  it('should expose the current-user endpoint under the authorization service path', () => {
    expect(GlobalConstants.currentUserPath)
      .toBe('https://services.lmalvarez.com/authorization/api/v1/int/user/current/notification');
  });

  it('should expose the notification endpoint under the authorization service path', () => {
    expect(GlobalConstants.notificationUserPath)
      .toBe('https://services.lmalvarez.com/authorization/api/v1/int/user/current/notification');
  });

  it('should expose the internal profile endpoint under the profile service path', () => {
    expect(GlobalConstants.profileInternalPath)
      .toBe('https://services.lmalvarez.com/profile/api/v1/int/profile');
  });

  it('should expose the external profile endpoint under the profile service path', () => {
    expect(GlobalConstants.profileExternalPath)
      .toBe('https://services.lmalvarez.com/profile/api/v1/ext/profile');
  });

  it('should keep current-user and notification paths aligned', () => {
    expect(GlobalConstants.currentUserPath).toBe(GlobalConstants.notificationUserPath);
  });
});
