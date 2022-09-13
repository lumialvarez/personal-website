import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPerfilComponent } from './portal/admin-perfil/admin-perfil.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AdminUsuariosComponent } from './portal/admin-usuarios/admin-usuarios.component';
import { PortalComponent } from './portal/portal.component';
import { AuthGuardGuard } from './_helpers/auth-guard.guard';
import { DashboardComponent } from './portal/dashboard/dashboard.component';
import { HerramientasComponent } from './portal/herramientas/herramientas.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent, data: { bodyClass: 'gradient' }  },
  {
    path: 'portal', component: PortalComponent, canActivate: [AuthGuardGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'admin-perfil', component: AdminPerfilComponent },
      { path: 'admin-usuarios', component: AdminUsuariosComponent },
      { path: 'herramientas', component: HerramientasComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
