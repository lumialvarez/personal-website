import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { DetalleProyectoComponent } from './main/detalle-proyecto/detalle-proyecto.component';
import { PortalComponent } from './portal/portal.component';
import { AdminUsuariosComponent } from './portal/admin-usuarios/admin-usuarios.component';
import { AdminPerfilComponent } from './portal/admin-perfil/admin-perfil.component';
import { DashboardComponent } from './portal/dashboard/dashboard.component';
import { BasicAuthInterceptor } from './_helpers/basic-auth-interceptor';
import { AdminConocimientoComponent } from './portal/admin-perfil/admin-conocimiento/admin-conocimiento.component';
import { AdminProyectoComponent } from './portal/admin-perfil/admin-proyecto/admin-proyecto.component';
import { HerramientasComponent } from './portal/herramientas/herramientas.component';
import {ToastsContainerComponent} from './toasts-container.component';
import {UserUpdateComponent} from './portal/admin-usuarios/user-update/user-update.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    LoginComponent,
    DetalleProyectoComponent,
    PortalComponent,
    AdminPerfilComponent,
    AdminUsuariosComponent,
    UserUpdateComponent,
    DashboardComponent,
    ToastsContainerComponent,
    AdminConocimientoComponent,
    AdminProyectoComponent,
    HerramientasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
