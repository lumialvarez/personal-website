# Changelog
Personal Web Page

## [2.4.0] - 13/06/2026
### Added
- Comprehensive unit test suite: 87 tests covering all HTTP services (login, profile, notification, user, CommonError), auth helpers (TokenService, AuthGuardGuard, BasicAuthInterceptor), the `RevealDirective` (with mocked `IntersectionObserver` and `fakeAsync/tick` fallback), the `ToastsContainerComponent`, `AppComponent` and the `User`/`Profile`/`Project`/`Knowledge`/`UserNotification`/`ProfileData` models
- Reusable GitHub Actions workflow (`.github/workflows/unit-tests.yml`) running unit tests with coverage on every push to `main` and callable via `workflow_call`; uploads the HTML/lcov report as an artifact and (if `CODECOV_TOKEN` is configured) to Codecov
- Test command in CI runs `ng test --no-watch --browsers=ChromeHeadlessCI --code-coverage`; the karma config auto-switches to headless when `CI=true`
### Changed
- Workflows renamed for a coherent `kebab-case` noun-based convention:
  - `test.yml` → `unit-tests.yml`
  - `build-and-push-test.yml` → `pr-build.yml`
  - `build-and-push.yml` → `release.yml`
  - `changelog_enforcer.yml` → `changelog.yml`
- `pr-build.yml` now calls the reusable `unit-tests.yml` workflow and the Docker build has `needs: test`, so the PR image is only pushed when all tests pass; tests run exactly once per PR (no duplicate execution)
- `karma.conf.js` now detects `CI` env var to switch the launcher and disable watch mode; added a `ChromeHeadlessCI` launcher with `--no-sandbox`, `--disable-gpu`, `--disable-dev-shm-usage` and `--headless=new` flags
- Replaced deprecated `karma-coverage-istanbul-reporter` (~3.0.3) with the standard `karma-coverage` (~2.2.1) required by `@angular-devkit/build-angular` v21; migrated the config from `coverageIstanbulReporter` to `coverageReporter` producing `html`, `text-summary` and `lcovonly` reports
### Fixed
- `src/test.ts` import updated from `'zone.js/dist/zone-testing'` to `'zone.js/testing'`, which is the correct subpath export for `zone.js` 0.16+
- `unit-tests.yml` `pull-requests: write` permission removed: a `pull_request`-triggered caller (`pr-build.yml`) inherits a read-only GITHUB_TOKEN that doesn't allow `pull-requests: write`, which made the `workflow_call` fail validation. Tests/coverage/artifacts don't need PR write access
- `unit-tests.yml` `actions: read` permission removed: a reusable workflow called via `workflow_call` from a `pull_request` context only has `actions: none`, so requesting `actions: read` failed validation. Steps that need the Actions API (`actions/cache`, `actions/upload-artifact`) are now marked `continue-on-error: true` so they degrade gracefully (cold `npm ci` and no downloadable artifact) instead of failing the whole run

## [2.3.0] - 13/06/2026
### Added
- Dashboard with profile metrics (projects, knowledges, notifications), top skills and recent notifications
- Meta tags for SEO and social sharing (description, Open Graph, Twitter Card, theme-color, preconnect to external resources)
- CSS custom properties in `:root` for colors, transitions and shadows
- Support for `prefers-reduced-motion` to disable animations
- Typography system with Inter web font (preloaded, fluid scale via `clamp()`) and consistent heading hierarchy
- Reveal-on-scroll directive (`appReveal`) using `IntersectionObserver` with direction and delay inputs
- Scroll-to-top floating button with `OnPush` and `requestAnimationFrame` throttling
- Animated section title underlines and project card image zoom on hover
- Loading and error states with retry in MainComponent hero
- `APP_VERSION` `InjectionToken` reading version from `package.json` (replaces fragile `require()`)
- `timeout` fallback in `appReveal` so content is revealed even if `IntersectionObserver` never fires
- SVG icon sprite for `@kolkov/angular-editor@3` (the package switched from font to SVG icons)
### Fixed
- Filter by category in "Conocimientos" section not working (invalid `on-click` attribute replaced with Angular `(click)`)
- Language selector in admin profile not working (same root cause)
- JWT token leaked in URL when opening StaticFileAdmin (now sent via `Authorization: Bearer` header)
- Memory leaks from unsubscribed Observables in main, login, portal, admin-perfil, admin-usuarios, user-update and new dashboard components
- Wrong types: `Int32Array` replaced with `number` for `User.id`, `Profile.profileId`, `LoginResponse.userId` and notification `SetReadNotification(id)`
- Login flow now validates token expiration via `isAuthenticated()` instead of only checking presence
- Debug `console.log` statements removed from menu and admin components
- Footer year hardcoded as 2022 now uses `new Date().getFullYear()`
- Section content (About, Conocimientos, Proyectos, Dashboard metric cards) was invisible because `.stagger` containers were missing `appReveal`, so child items never received the `.revealed` class and stayed at `opacity: 0`
- Progress bars in `Conocimientos` and Dashboard now animate from 0 to target when the ancestor `.stagger` reveals (no longer requires `appReveal` on each bar)
- HTTP responses in Dashboard, Admin Perfil, Admin Usuarios and Portal components were not updating the view; added `ChangeDetectorRef.markForCheck()` after each subscription. The "Actualizar" button worked because clicks force a `Zone.js` change detection pass on the whole tree
- Main page stuck on "Cargando perfil..." because `loading` flag was only set in the `next` callback (which threw on malformed data) and the `error` handler did not always fire
- Toolbar buttons of `@kolkov/angular-editor` rendered as empty squares because v3 switched from font icons to SVG sprite and the sprite file was never copied to `src/assets/ae-icons/icons.svg`
### Changed
- All HTTP subscriptions now use `takeUntilDestroyed(destroyRef)` for automatic cleanup
- Color values centralized in CSS variables and applied across main, menu, portal and login styles
- Hardcoded `rgba(12, 36, 97, ...)` replaced with `var(--color-primary)` and `rgba(var(--color-primary-rgb), ...)`
- `admin-usuarios` modal handling refactored: `openUserModal(user)` private method shared by create and update flows
- Visual redesign: hero with staggered fade-up, glass-morphism login, gradient sidebar, animated nav underline, metric cards with colored side accent, project cards with image zoom and elevation
- Components use unified design tokens (spacing, radius, shadow, motion) from `:root`
- Scrollbar styled cross-browser; selection color uses brand primary
- Navbar adds `is-scrolled` class with backdrop-blur, shadow and padding shrink; polling `setTimeout` retries replaced with native `scrollIntoView`
- Login rebuilt with glassmorphism card, input icons, focus ring, gradient submit and floating background orbs
- **Upgraded to Angular 21.2.17** (from 17.3.10). Bumped `@angular/cli`, `@angular-devkit/build-angular`, `@ng-bootstrap/ng-bootstrap` (20.0.0), `ngx-spinner` (21.1.0), `ngx-page-scroll-core` (16.0.0), `@kolkov/angular-editor` (3.0.5), `bootstrap` (5.3.8), `rxjs` (7.8.2), `tslib` (2.8.1), `typescript` (5.9.3), `zone.js` (0.16.2)
- `tsconfig.json`: `moduleResolution` switched from `"node"` to `"bundler"` and `module`/`target` bumped to `ES2022` to support new subpath exports
- Added `standalone: false` to all `@Component` and the `RevealDirective` (Angular 19+ default is `standalone: true`, which is incompatible with the current `NgModule` architecture)
- `tsconfig.spec.json`, `tslint.json`, `e2e/` directory and the `lint`/`e2e` scripts and architect targets removed
### Removed
- Dead code: `String.prototype.escapeSpecialChars` global prototype pollution
- Production polyfill: `import 'zone.js/testing'`
- "Top conocimientos" panel from dashboard (now only metric cards, recent notifications and quick actions); related `topKnowledges` state and `.skill-list*` CSS
- Deprecated dev dependencies: `tslint`, `codelyzer`, `protractor` (and its transitive `webdriver-manager`, `selenium-webdriver`, etc.)

## [Unreleased]
- Contact form
- Chatbot

## [2.2.2] - 27/07/2025
### Fixed
- nginx config

## [2.2.1] - 27/07/2025
### Fixed
- nginx config

## [2.2.0] - 05/06/2024
### Added
- Add GitHub Action force to update changelog

## [2.1.7] - 04/06/2024
### Fixed
- Update Dependencies

## [2.1.6] - 26/05/2024
### Fixed
- Fix CORS policy

## [2.1.5] - 26/05/2024
### Fixed
- Add CORS policy

## [2.1.4] - 24/01/2024
### Fixed
- Add Github Action for pull request and create test

## [2.1.3] - 20/01/2024
### Fixed
- Update to Angular 17 syntax

## [2.1.2] - 19/01/2024
### Fixed
- Update Angular version and dependencies [Issue #32](https://github.com/lumialvarez/personal-website/issues/32)

## [2.1.1] - 19/01/2024
### Fixed
- CI migration from jenkins to Github Actions [Issue #50](https://github.com/lumialvarez/personal-website/issues/50)

## [2.1.0] - 25/11/2023
### Added
- Add User Administration [Issue #31](https://github.com/lumialvarez/personal-website/issues/31)

## [2.0.1] - 22/02/2023
### Fixed
- Fix vulnerabilities shown by dependabot [Issue #46](https://github.com/lumialvarez/personal-website/issues/46)

## [2.0.0] - 22/02/2023
### Added
- Usage of new backend services in Golang (authorization and profile) [Issue #43](https://github.com/lumialvarez/personal-website/issues/43)

## [1.4.6] - 05/01/2023
### Fixed
- Fix vulnerabilities shown by dependabot [Issue #37](https://github.com/lumialvarez/personal-website/issues/37)

## [1.4.5] - 20/09/2022
### Fixed
- API path change

## [1.4.4] - 13/09/2022
### Fixed
- Visual issues in mobile view (internal portal)

## [1.4.3] - 12/09/2022
### Fixed
- Visual issues in mobile view (main and login)

## [1.4.2] - 06/09/2022
### Fixed
- Elimination of unnecessary execution of the actualizarEstilosContenido method

## [1.4.1] - 14/07/2022
### Fixed
- Code quality review

## [1.4.0] - 10/05/2022
### Added
- Create new knowledge in admin portal

## [1.3.3] - 09/05/2022
### Fixed
- Fixed package vulnerabilities
- Update npm packages

## [1.3.2] - 27/03/2022
### Fixed
- Fixed package vulnerabilities

## [1.3.1] - 01/03/2022
### Changed
- Delete assets and use the resource server instead

## [1.3.0] - 01/03/2022
### Added
- Tools section in portal

## [1.2.1] - 11/02/2022
### Fixed
- Apply Dependabot alerts
- Menu in portal

## [1.2.0] - 16/01/2022
### Changed
- Update to Angular 13

## [1.1.5] - 13/11/2021
### Fixed
- Proyect modal

## [1.1.4] - 13/11/2021
### Fixed
- Clean and Fix jenkinsfile

## [1.1.3] - 08/11/2021
### Added
- Notifications

### Fixed
- Proyect modal in portal
- Clean and Fix jenkinsfile
- Main name height

## [1.1.2] - 08/08/2021
### Fixed
- Profile Description

## [1.0.1] - 27/05/2021
### Added
- Lazyload

## [1.0.1] - 23/05/2021
### Added
- Use of webservices

### Fixed
- Images optimization

## [0.0.1] - 17/05/2021
### Added
- Initial webpage
