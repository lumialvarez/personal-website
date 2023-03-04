export class ListResponse {
  users: User[];
}

export class User {
  userId: number;
  name: string;
  userName: string;
  email: string;
  role: string;
  status: boolean;
}
