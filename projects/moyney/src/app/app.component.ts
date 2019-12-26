import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoyButtonRound } from '@libs/moy-button/moy-button.models';
import { MoyHeaderConfig } from '@libs/moy-header/moy-header.models';

@Component({
  selector: 'moy-root',
  template: `
    <moy-header [config]="headerConfig"></moy-header>
    <div class="Moyney">
      <router-outlet></router-outlet>
    </div>
    <moy-footer [config]="{ message: 'Created by F. Santorelli 2019' }"></moy-footer>
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

  headerConfig = new MoyHeaderConfig({
    title: 'Moyney',
    suffixButtons: [
      new MoyButtonRound({
        icon: 'person',
        click() {
          alert('opening login! :D');
        },
      }),
    ],
  });
}
