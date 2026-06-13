import {InjectionToken} from '@angular/core';
import pkg from '../../../package.json';

export const APP_VERSION = new InjectionToken<string>('APP_VERSION', {
  factory: () => pkg.version,
});
