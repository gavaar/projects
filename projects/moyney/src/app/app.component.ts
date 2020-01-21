import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AbstractMoyButton, MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { MoyHeaderConfig } from '@libs/moy-header/moy-header.models';
import { LoginComponent } from './login/login.component';

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
})
export class AppComponent {
  title = 'moyney';
  currentYear = new Date().getFullYear();

  constructor(public dialog: MatDialog) {}

  headerConfig = new MoyHeaderConfig({
    title: 'Moyney',
    suffixButtons: [
      new MoyButtonRound({
        icon: 'person',
        click: () => {
          this.dialog.open(LoginComponent);
        },
      }),
    ],
  });

  onButtonClick(b: AbstractMoyButton) {
    // b.click();
  }
}
