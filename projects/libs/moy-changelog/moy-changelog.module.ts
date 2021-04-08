import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';

export interface Changelog {
  version: string;
  changes: string[];
}

@Component({
  selector: 'moy-changelog',
  template: `
    <section class="Changelog">
      <div *ngFor="let change of changelog; trackBy: changeFn">
        <h3 class="Changelog__title">{{ change.version }}</h3>
        <ul class="Changelog__list">
          <li *ngFor="let point of change.changes; trackBy: pointFn">{{ point }}</li>
        </ul>
      </div>
    </section>
  `,
  styles: [
    `
      .Changelog {
        padding: 0.5rem;
        overflow: auto;
      }

      .Changelog__title {
        margin-left: 1.2rem;
      }

      .Changelog__list {
        font-size: 0.85rem;
        padding-inline-start: 2rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyChangelogComponent {
  @Input() changelog: Changelog[] = [];
  changeFn = i => i;
  pointFn = i => i;
}

@NgModule({
  imports: [CommonModule],
  declarations: [MoyChangelogComponent],
  exports: [MoyChangelogComponent],
})
export class MoyChangelogModule { }
