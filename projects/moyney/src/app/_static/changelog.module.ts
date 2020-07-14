import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CHANGELOG } from '../../assets/static/changelog';

@Component({
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
})
class ChangelogStaticComponent {
  changelog = CHANGELOG;
  changeFn = i => i;
  pointFn = i => i;
}

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: ChangelogStaticComponent }])],
  declarations: [ChangelogStaticComponent],
})
export class ChangelogStaticModule {}
