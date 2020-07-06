import { ChangeDetectionStrategy, Component, HostListener, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { MoyHeaderConfig } from '@libs/moy-header/moy-header.models';
import { Auth } from './auth';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const MOYNEY_VERSION = '0.16.2';

@Component({
  selector: 'moy-root',
  template: `
    <moy-header [config]="headerConfig"></moy-header>
    <div class="Moyney">
      <router-outlet></router-outlet>
    </div>
    <moy-footer
      [config]="{
        message: 'Created by F. Santorelli ' + currentYear,
        links: footerLinks
      }"
    ></moy-footer>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-flow: column nowrap;
        height: 100vh;
      }

      .Moyney {
        flex-grow: 1;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Auth],
})
export class AppComponent {
  @HostListener('window:beforeunload')
  saveBeforeClosing(): void {
    localStorage.setItem('state', JSON.stringify(this.store.state));
  }

  title = 'moyney';
  currentYear = new Date().getFullYear();
  footerLinks = [
    { label: MOYNEY_VERSION, link: '#' },
    { label: 'privacy', link: '/privacy' },
  ];

  constructor(public dialog: MatDialog, private store: Auth, private router: Router) {
    this.store.state = JSON.parse(localStorage.getItem('state')) || { user: { uid: '~~default~~' } };
  }

  headerConfig = new MoyHeaderConfig({
    title: 'Moyney',
    titleIcon: 'home',
    onTitleClick: () => {
      this.router.navigateByUrl('');
    },
    suffixButtons: [
      new MoyButtonRound({
        icon: 'person',
        click: () => {
          const prevUser = this.store.state.user.uid;
          const component = this.store.state.user.uid !== '~~default~~' ? ProfileComponent : LoginComponent;
          this.dialog
            .open(<any>component)
            .afterClosed()
            .subscribe(_ => {
              if (this.store.state.user.uid !== prevUser) location.reload();
            });
        },
      }),
    ],
  });
}
