# Changelog
Personal Web Page

## [Unreleased]
### Added
- Dashboard with profile metrics (projects, knowledges, notifications), top skills and recent notifications
- Meta tags for SEO and social sharing (description, Open Graph, Twitter Card, theme-color, preconnect to external resources)
- CSS custom properties in `:root` for colors, transitions and shadows
- Support for `prefers-reduced-motion` to disable animations
- Typography system with Inter web font (preloaded, fluid scale via `clamp()`) and consistent heading hierarchy
- Reveal-on-scroll directive (`appReveal`) using `IntersectionObserver` with direction and delay inputs
- Scroll-to-top floating button with `OnPush` and `requestAnimationFrame` throttling
- Animated section title underlines and project card image zoom on hover
### Fixed
- Filter by category in "Conocimientos" section not working (invalid `on-click` attribute replaced with Angular `(click)`)
- Language selector in admin profile not working (same root cause)
- JWT token leaked in URL when opening StaticFileAdmin (now sent via `Authorization: Bearer` header)
- Memory leaks from unsubscribed Observables in main, login, portal, admin-perfil, admin-usuarios, user-update and new dashboard components
- Wrong types: `Int32Array` replaced with `number` for `User.id`, `Profile.profileId`, `LoginResponse.userId` and notification `SetReadNotification(id)`
- Login flow now validates token expiration via `isAuthenticated()` instead of only checking presence
- Debug `console.log` statements removed from menu and admin components
- Footer year hardcoded as 2022 now uses `new Date().getFullYear()`
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
### Removed
- Dead code: `String.prototype.escapeSpecialChars` global prototype pollution
- Production polyfill: `import 'zone.js/testing'`

### Fixed
- Section content (About, Conocimientos, Proyectos, Dashboard metric cards) was invisible because `.stagger` containers were missing `appReveal`, so child items never received the `.revealed` class and stayed at `opacity: 0`
- Progress bars in `Conocimientos` and Dashboard now animate from 0 to target when the ancestor `.stagger` reveals (no longer requires `appReveal` on each bar)

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
