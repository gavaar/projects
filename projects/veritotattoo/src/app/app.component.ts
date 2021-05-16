import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MoyFooterConfig } from '@libs/moy-footer';
import { MoyHeaderConfig } from '@libs/moy-header';
import changelog from 'assets/_static/changelog';

@Component({
  selector: 'vero-root',
  template: `
    <section class="Vero">
      <moy-header [config]="headerConfig"></moy-header>
      <div class="Vero__body moy-container">
        <router-outlet></router-outlet>
      </div>
      <moy-footer [config]="footerConfig"></moy-footer>
    </section>
  `,
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  headerConfig = new MoyHeaderConfig({ title: 'Verito Tattoo', titleIcon: 'home', onTitleClick: () => this.router.navigate(['/']) });
  footerConfig: MoyFooterConfig = {
    message: 'Work in progress, @github: gavaar',
    links: [{ label: `v. ${changelog[0].version}`, link: 'changelog' }],
  };

  constructor(private router: Router) {}
}
