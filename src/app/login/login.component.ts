import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GlobalConstants } from './../common/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    nombreUsuario: null,
    password: null
  };
  public nombreUsuario: string = null;
  public password: string = null;

  private apiLogin: string = null;
  constructor(private httpClient: HttpClient) {
    this.apiLogin = GlobalConstants.apiBasePath + GlobalConstants.loginPath;
    console.log(this.apiLogin);
  }

  ngOnInit(): void {
  }

  inicioSesion() {
    console.log(this.user.nombreUsuario);
    console.log(this.user.password);

    this.httpClient.post(this.apiLogin, this.user).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

}
