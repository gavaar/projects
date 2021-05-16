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

    <article class="temporal-sidebar">
      <a routerLink="">Home</a>
      <a routerLink="about">About</a>
      <a routerLink="contact">Contact</a>
      <a routerLink="reserve">Reserve</a>
      <a routerLink="changelog">Changes</a>
    </article>
  `,
  styleUrls: ['./app.component.scss'],
  styles: [`
    .temporal-sidebar {
      position: absolute;
      display: flex;
      flex-flow: column nowrap;
      left: 0;
      top: 0;
      padding: 3rem;

      a {
        margin: 1rem;
      }
    }
  `],
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
