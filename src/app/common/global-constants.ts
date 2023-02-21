export class GlobalConstants {
  private static apiBasePath = 'https://services.lmalvarez.com';
  private static authorizationServicePath = '/authorization/api/v1';
  private static profileServicePath = '/profile/api/v1';

  public static userPath = this.apiBasePath + this.authorizationServicePath + '/int/user';
  public static loginPath = this.apiBasePath + this.authorizationServicePath + '/ext/user/login';
  public static currentUserPath = this.apiBasePath + this.authorizationServicePath + '/int/user/current/notification';
  public static notificationUserPath = this.apiBasePath + this.authorizationServicePath + '/int/user/current/notification';
  public static profileInternalPath = this.apiBasePath + this.profileServicePath + '/int/profile';
  public static profileExternalPath = this.apiBasePath + this.profileServicePath + '/ext/profile';


}
