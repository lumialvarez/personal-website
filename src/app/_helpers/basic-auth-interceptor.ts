import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {TokenService} from '../_services/token.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService, private spinner: NgxSpinnerService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        if (this.tokenService.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }

        this.spinner.show().then(() => {});
        return next.handle(req).pipe(finalize(() => this.spinner.hide()));
    }
}
