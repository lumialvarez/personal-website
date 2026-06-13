import {Component, OnInit, inject} from '@angular/core';
import {TokenService} from '../../_services/token.service';
import {ToastService} from '../../_services/toast.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})
export class HerramientasComponent implements OnInit {
  private readonly staticFileAdminUrl = 'https://tomcat.lmalvarez.com/StaticFileAdmin';
  private readonly tokenService = inject(TokenService);
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {
  }

  openStaticFileAdmin(): void {
    const token = this.tokenService.getToken();
    if (!token) {
      this.toastService.showDanger('No hay sesión activa');
      return;
    }

    fetch(this.staticFileAdminUrl, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank', 'noopener,noreferrer');
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
      })
      .catch((err) => {
        console.error('Error abriendo StaticFileAdmin', err);
        this.toastService.showDanger(
          'No se pudo abrir StaticFileAdmin. Verifica la configuración CORS del servicio.'
        );
        window.open(this.staticFileAdminUrl, '_blank', 'noopener,noreferrer');
      });
  }
}
