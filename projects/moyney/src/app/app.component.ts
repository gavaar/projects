import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'moy-root',
  template: `
    <moy-header [config]="{ title: 'Moyney' }"></moy-header>
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
}
