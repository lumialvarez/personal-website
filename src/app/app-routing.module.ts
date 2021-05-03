import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { main } from '@popperjs/core';
import { AdminPerfilComponent } from './portal/admin-perfil/admin-perfil.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AdminUsuariosComponent } from './portal/admin-usuarios/admin-usuarios.component';
import { PortalComponent } from './portal/portal.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { DashboardComponent } from './portal/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'portal', component: PortalComponent, canActivate: [AuthGuardGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'admin-perfil', component: AdminPerfilComponent },
      { path: 'admin-usuarios', component: AdminUsuariosComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
