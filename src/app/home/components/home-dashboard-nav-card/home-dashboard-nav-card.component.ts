import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'home-dashboard-nav-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-dashboard-nav-card.component.html',
  styleUrls: ['./home-dashboard-nav-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDashboardNavCardComponent {
  @Input() key: string = '';
}
