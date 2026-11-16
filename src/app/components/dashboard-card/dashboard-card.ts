import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  templateUrl: './dashboard-card.html'
})
export class DashboardCardComponent {

  @Input()
  title = '';

  @Input()
  value = 0;

  @Input()
  color = 'primary';

}