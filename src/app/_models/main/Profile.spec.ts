import { Knowledge, Profile, ProfileData, Project } from './Profile';

describe('Profile', () => {
  it('should allow building a profile with the expected fields', () => {
    const data = new ProfileData();
    data.name = 'Main';
    const p = new Profile();
    p.profileId = 1;
    p.profileLanguage = 'es';
    p.profileData = data;
    p.lastUpdate = '2025-01-01';
    p.status = true;

    expect(p.profileId).toBe(1);
    expect(p.profileLanguage).toBe('es');
    expect(p.profileData).toBe(data);
    expect(p.lastUpdate).toBe('2025-01-01');
    expect(p.status).toBeTrue();
  });
});

describe('Project', () => {
  it('should build an empty project when no argument is provided', () => {
    const p = new Project();

    expect(p.id).toBeUndefined();
    expect(p.name).toBeUndefined();
    expect(p.description).toBeUndefined();
    expect(p.detailHtml).toBeUndefined();
    expect(p.mainImage).toBeUndefined();
    expect(p.order).toBeUndefined();
  });

  it('should copy all fields from the source project', () => {
    const source = new Project();
    source.id = 1;
    source.name = 'Project A';
    source.description = 'desc';
    source.detailHtml = '<p>html</p>';
    source.mainImage = 'img.png';
    source.order = 3;

    const copy = new Project(source);

    expect(copy.id).toBe(1);
    expect(copy.name).toBe('Project A');
    expect(copy.description).toBe('desc');
    expect(copy.detailHtml).toBe('<p>html</p>');
    expect(copy.mainImage).toBe('img.png');
    expect(copy.order).toBe(3);
  });
});

describe('Knowledge', () => {
  it('should build an empty knowledge when no argument is provided', () => {
    const k = new Knowledge();

    expect(k.id).toBeUndefined();
    expect(k.name).toBeUndefined();
    expect(k.type).toBeUndefined();
    expect(k.level).toBeUndefined();
    expect(k.description).toBeUndefined();
    expect(k.categories).toBeUndefined();
  });

  it('should copy fields and rebuild the categories array', () => {
    const source = new Knowledge();
    source.id = 1;
    source.name = 'Angular';
    source.type = 'framework';
    source.level = 4;
    source.description = 'frontend framework';
    source.categories = ['web', 'frontend'];

    const copy = new Knowledge(source);

    expect(copy.id).toBe(1);
    expect(copy.name).toBe('Angular');
    expect(copy.type).toBe('framework');
    expect(copy.level).toBe(4);
    expect(copy.description).toBe('frontend framework');
    expect(copy.categories).toEqual(['web', 'frontend']);
    expect(copy.categories).not.toBe(source.categories);
  });

  it('should not throw when the source categories are undefined', () => {
    const source = new Knowledge();
    source.categories = undefined as any;

    expect(() => new Knowledge(source)).toThrow();
  });
});
