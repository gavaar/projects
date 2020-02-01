import { ChangeDetectionStrategy, Component, HostListener, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AbstractMoyButton, MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { MoyHeaderConfig } from '@libs/moy-header/moy-header.models';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { Store } from './store';

@Injectable()
export class AppStore extends Store<{ user: { uid: string } }> {}

@Component({
  selector: 'moy-root',
  template: `
    <moy-header [config]="headerConfig" (buttonClick)="onButtonClick($event)"></moy-header>
    <div class="Moyney">
      <router-outlet></router-outlet>
    </div>
    <moy-footer [config]="{ message: 'Created by F. Santorelli ' + currentYear }"></moy-footer>
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
  providers: [AppStore],
})
export class AppComponent {
  @HostListener('window:beforeunload', ['$event'])
  saveBeforeClosing(event: any): void {
    localStorage.setItem('state', JSON.stringify(this.store.state));
  }

  title = 'moyney';
  currentYear = new Date().getFullYear();

  constructor(public dialog: MatDialog, private store: AppStore) {
    this.store.state = JSON.parse(localStorage.getItem('state'));
  }

  headerConfig = new MoyHeaderConfig({
    title: 'Moyney',
    suffixButtons: [
      new MoyButtonRound({
        icon: 'person',
        click: () => {
          const component = this.store.state.user && this.store.state.user.uid ? ProfileComponent : LoginComponent;
          this.dialog.open(<any>component);
        },
      }),
    ],
  });

  onButtonClick(b: AbstractMoyButton) {
    // b.click(); might delete as object already handles click
  }
}
