import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoyFooterConfig } from '@libs/moy-footer';
import changelog from 'assets/_static/changelog';

@Component({
  selector: 'vero-root',
  template: `
    <section veroPalette class="Vero">
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
  footerConfig: MoyFooterConfig = {
    message: 'Work in progress, @github: gavaar',
    links: [{ label: `v. ${changelog[0].version}`, link: 'changelog' }],
  };
}
