import { User, UserNotification } from './user';

describe('User', () => {
  describe('constructor (no args)', () => {
    it('should create an empty user with undefined fields', () => {
      const user = new User();

      expect(user.userId).toBeUndefined();
      expect(user.name).toBeUndefined();
      expect(user.userName).toBeUndefined();
      expect(user.password).toBeUndefined();
      expect(user.email).toBeUndefined();
      expect(user.role).toBeUndefined();
      expect(user.notifications).toBeUndefined();
      expect(user.status).toBeUndefined();
    });
  });

  describe('copy constructor', () => {
    it('should copy all listed fields from the source user', () => {
      const source = new User();
      source.userId = 1;
      source.name = 'Luis';
      source.userName = 'lumialvarez';
      source.email = 'luis@example.com';
      source.role = 'ADMIN';
      source.notifications = [{ id: 1, title: 't', detail: 'd', date: '2025-01-01', read: false } as UserNotification];
      source.status = true;

      const copy = new User(source);

      expect(copy.userId).toBe(1);
      expect(copy.name).toBe('Luis');
      expect(copy.userName).toBe('lumialvarez');
      expect(copy.email).toBe('luis@example.com');
      expect(copy.role).toBe('ADMIN');
      expect(copy.notifications).toBe(source.notifications);
      expect(copy.status).toBeTrue();
    });

    it('should NOT copy the password field (intentionally)', () => {
      const source = new User();
      source.password = 'secret';

      const copy = new User(source);

      expect(copy.password).toBeUndefined();
    });

    it('should not mutate the source user when copy is modified', () => {
      const source = new User();
      source.name = 'Original';
      const copy = new User(source);

      copy.name = 'Modified';

      expect(source.name).toBe('Original');
    });
  });
});

describe('UserNotification', () => {
  it('should allow building a notification with the expected fields', () => {
    const n: UserNotification = {
      id: 5,
      title: 'Welcome',
      detail: 'Hi there',
      date: '2025-06-01',
      read: false
    };

    expect(n.id).toBe(5);
    expect(n.title).toBe('Welcome');
    expect(n.detail).toBe('Hi there');
    expect(n.date).toBe('2025-06-01');
    expect(n.read).toBeFalse();
  });
});
