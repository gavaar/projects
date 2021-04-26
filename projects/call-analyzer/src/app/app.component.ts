import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { MoyHeaderConfig } from '@libs/moy-header/moy-header.models';
import { CHANGELOG } from '../assets/static/changelog';

@Component({
  selector: 'call-root',
  template: `
    <moy-header [config]="headerConfig"></moy-header>
    <div class="CallAnalyzer">
      <router-outlet></router-outlet>
    </div>
    <moy-footer [config]="footerConfig">footer</moy-footer>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-flow: column nowrap;
        height: 100vh;
      }

      .CallAnalyzer {
        flex-grow: 1;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Calls Analyzer';
  currentYear = new Date().getFullYear();
  changelogVersion = CHANGELOG[0].version;

  constructor(private router: Router) {}

  footerConfig = {
    message: `Calls Analyzer ${this.currentYear}`,
    links: [
      { label: `made by F.S. ${this.currentYear}` },
      { label: `v. ${this.changelogVersion}`, link: 'changelog' },
    ],
  };

  headerConfig = new MoyHeaderConfig({
    title: 'Calls Analyzer',
    titleImgURI: 'assets/icons/logo.png',
    onTitleClick: () => {
      this.router.navigateByUrl('');
    },
    suffixButtons: [new MoyButtonRound({ icon: 'person' })],
  });
}
