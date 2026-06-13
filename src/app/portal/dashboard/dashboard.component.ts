import {Component, DestroyRef, OnInit, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TokenService} from '../../_services/token.service';
import {User, UserNotification} from '../../_models/user';
import {ProfileService} from '../../_services/http/profile/perfil.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly profileService = inject(ProfileService);
  private readonly destroyRef = inject(DestroyRef);

  user: User;
  unreadNotifications: UserNotification[] = [];
  projectsCount = 0;
  knowledgesCount = 0;
  recentNotifications: UserNotification[] = [];
  today = '';

  private readonly monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  private readonly weekdayNames = [
    'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
  ];

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    const now = new Date();
    this.today = `${this.weekdayNames[now.getDay()]}, ${now.getDate()} de ${this.monthNames[now.getMonth()]}`;

    if (this.user?.notifications) {
      this.unreadNotifications = this.user.notifications.filter((n) => !n.read);
      this.recentNotifications = [...this.user.notifications]
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
        .slice(0, 5);
    }
    this.loadProfileStats();
  }

  private loadProfileStats(): void {
    this.profileService.getProfiles()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          const active = data.profiles.find((p) => p.status) || data.profiles[0];
          if (!active) {
            return;
          }
          this.projectsCount = active.profileData.projects.length;
          this.knowledgesCount = active.profileData.knowledges.length;
        },
        error: (err) => console.error('Error cargando estadísticas del perfil', err)
      });
  }
}
