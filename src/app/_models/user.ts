export class User {
  userId: Int32Array;
  name: string;
  userName: string;
  email: string;
  role: string;
  notifications: UserNotification[];
}

export class UserNotification {
  id: Int32Array;
  title: string;
  detail: string;
  date: string;
  read: boolean;
}
