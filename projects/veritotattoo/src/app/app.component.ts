import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoyFooterConfig } from '@libs/moy-footer';
import { AppConfig, AppConfigSections, AppConfigService } from '@vero-components/app-config';
import changelog from 'assets/_static/changelog';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'vero-root',
  template: `
    <section [veroPalette]="palette | async" class="Vero">
      <vero-header></vero-header>
      <div class="moy-container">
        <router-outlet></router-outlet>
      </div>
      <!-- <moy-footer [config]="footerConfig"></moy-footer> -->
    </section>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  palette: Observable<AppConfig[AppConfigSections.Colors]>;
  // footerConfig: MoyFooterConfig = {
  //   message: 'Work in progress, @github: gavaar',
  //   links: [{ label: `v. ${changelog[0].version}`, link: 'changelog' }],
  // };
  constructor(config: AppConfigService) {
    this.palette = config.get().pipe(map(c => c[AppConfigSections.Colors]));
  }
}
