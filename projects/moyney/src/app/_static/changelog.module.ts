import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CHANGELOG } from '../../assets/static/changelog';

@Component({
  template: `
    <moy-changelog [changelog]="changelog"></moy-changelog>
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
