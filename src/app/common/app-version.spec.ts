import { TestBed } from '@angular/core/testing';

import { APP_VERSION } from './app-version';
import pkg from '../../../package.json';

describe('APP_VERSION injection token', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be defined and have a description', () => {
    expect(APP_VERSION).toBeTruthy();
    expect(APP_VERSION.toString()).toContain('APP_VERSION');
  });

  it('should provide the package.json version when injected', () => {
    const version = TestBed.inject(APP_VERSION);

    expect(version).toBe(pkg.version);
  });
});
