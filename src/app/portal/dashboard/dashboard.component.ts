import {Component, OnInit, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TokenService} from '../../_services/token.service';
import {User, UserNotification} from '../../_models/user';
import {ProfileService} from '../../_services/http/profile/perfil.service';
import {Profile, Knowledge} from '../../_models/main/Profile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly profileService = inject(ProfileService);

  user: User;
  unreadNotifications: UserNotification[] = [];
  projectsCount = 0;
  knowledgesCount = 0;
  recentNotifications: UserNotification[] = [];
  topKnowledges: Knowledge[] = [];

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    if (this.user?.notifications) {
      this.unreadNotifications = this.user.notifications.filter((n) => !n.read);
      this.recentNotifications = [...this.user.notifications]
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
        .slice(0, 5);
    }
    this.loadProfileStats();
  }

  private loadProfileStats(): void {
    this.profileService.getProfiles().subscribe({
      next: (data) => {
        const active = data.profiles.find((p) => p.status) || data.profiles[0];
        if (!active) {
          return;
        }
        this.projectsCount = active.profileData.projects.length;
        this.knowledgesCount = active.profileData.knowledges.length;
        this.topKnowledges = [...active.profileData.knowledges]
          .sort((a, b) => b.level - a.level)
          .slice(0, 6);
      },
      error: (err) => console.error('Error cargando estadísticas del perfil', err)
    });
  }
}
