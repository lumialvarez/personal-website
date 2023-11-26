export class User {
  constructor(user?: User) {
    if (user) {
        this.userId = user.userId;
        this.name = user.name;
        this.userName = user.userName;
        this.email = user.email;
        this.role = user.role;
        this.notifications = user.notifications;
        this.status = user.status;
    }
  }

  userId: number;
  name: string;
  userName: string;
  password: string;
  email: string;
  role: string;
  notifications: UserNotification[];
  status: boolean;
}

export class UserNotification {
  id: Int32Array;
  title: string;
  detail: string;
  date: string;
  read: boolean;
}
