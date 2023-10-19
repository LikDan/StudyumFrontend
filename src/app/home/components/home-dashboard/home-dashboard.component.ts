import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from '@ui/images/character.component';
import { HomeDashboardNavCardComponent } from '@home/components/home-dashboard-nav-card/home-dashboard-nav-card.component';
import { Head2Component } from '@ui/text/head2.component';
import { HomeDashboardChartComponent } from '@home/components/home-dashboard-chart/home-dashboard-chart.component';
import { Observable } from 'rxjs';
import { UserPreview } from '@jwt/jwt.models';
import { JwtService } from '@jwt/jwt.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CharacterComponent,
    HomeDashboardNavCardComponent,
    Head2Component,
    HomeDashboardChartComponent,
    RouterLink,
  ],
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDashboardComponent implements OnInit {
  user$!: Observable<UserPreview | null>;

  private jwtService = inject(JwtService);

  ngOnInit(): void {
    this.user$ = this.jwtService.userPreview$;
  }
}
