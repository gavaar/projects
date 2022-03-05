import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { verticalExpandCollapse } from '@libs/animations';

export interface Changelog {
  version: string;
  changes: string[];
  techChanges?: string[];
}

@Component({
  selector: 'moy-changelog',
  template: `
    <section class="Changelog">
      <div *ngFor="let change of changelog; trackBy: changeFn">
        <h3 class="Changelog__title">
          {{ change.version }}
        </h3>
        <ul class="Changelog__list">
          <li *ngFor="let point of change.changes; trackBy: pointFn">{{ point }}</li>
        </ul>

        <h5 *ngIf="change.techChanges" class="Changelog__tech-title" (click)="change.open = !change.open">
          <span class="arrow" [ngClass]="{ down: change.open, right: !change.open }"></span>
          Dev / Tech Changes
        </h5>
        <ul [@verticalExpandCollapse]="change.open ? 'expanded' : 'collapsed'" class="Changelog__tech-list">
          <li *ngFor="let techPoint of change.techChanges; trackBy: pointFn">{{ techPoint }}</li>
        </ul>
      </div>
    </section>
  `,
  styles: [
    `
      .Changelog {
        padding: 0.5rem;
        overflow: visible;
      }

      .Changelog__title {
        margin-left: 1.2rem;
      }

      .Changelog__tech-title {
        margin-left: 1.2rem;
        cursor: pointer;
        opacity: 0.3;
      }

      .Changelog__tech-title:hover {
        opacity: 1;
        transition: 0.2s;
      }

      .Changelog__list {
        font-size: 0.85rem;
        padding-inline-start: 2rem;
      }

      .Changelog__tech-list {
        font-size: 0.85rem;
        padding-inline-start: 4rem;
      }

      .arrow {
        border: solid black;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 2px;
        margin: 2px auto;
      }

      .arrow.right {
        transform: rotate(-45deg);
        transition: 0.2s;
      }
      .arrow.down {
        transform: rotate(45deg);
        transition: 0.2s;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [verticalExpandCollapse]
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
