import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppConfig, AppConfigSections, AppConfigService } from '@vero-components/app-config';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../_styles/_home.common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  readonly AppConfigSections = AppConfigSections;

  config: Observable<AppConfig>;

  constructor(private configService: AppConfigService) {}

  ngOnInit(): void {
    this.config = this.configService.get();
  }
}
