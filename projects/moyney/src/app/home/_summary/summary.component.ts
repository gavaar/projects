import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoyLoadingBar } from '@libs/moy-loading-bar/moy-loading-bar.models';

@Component({
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  totalsSummary = new MoyLoadingBar({
    total: 500,
    loaded: 300,
    loading: 50,
    title: 'Positive Loading',
  });

  totalsSummary2 = new MoyLoadingBar({
    total: 500,
    loaded: 300,
    loading: -50,
    title: 'Negative Loading',
  });

  totalsSummary3 = new MoyLoadingBar({
    total: 500,
    loaded: 600,
    loading: -50,
    title: 'Negative Loading',
  });
}
