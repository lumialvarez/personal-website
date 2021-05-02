import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { main } from '@popperjs/core';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PortalComponent } from './portal/portal.component';
import { AuthGuardGuard } from './services/auth-guard.guard';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'portal', component: PortalComponent, canActivate: [AuthGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
