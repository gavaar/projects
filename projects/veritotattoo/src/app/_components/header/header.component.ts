import { ChangeDetectionStrategy, Component } from '@angular/core';
import { headerConfig } from './header.config';
import { HeaderConfig } from './header.models';

@Component({
  selector: 'vero-header',
  template: `
    <header class="VeroHeader" (moyScrollbar)="onScroll($event)">
      <span class="VeroHeader__background"></span>
      <div class="VeroHeader__content">
        <ng-container *ngFor="let link of headerConfig; let i = index; trackBy: linkFn">
          <mat-icon *ngIf="link.icon"
            [ngStyle]="{ 'margin-top': (1 - headerShrinkPercentage) * (3.5 + i % 2) + 'rem' }"
            (click)="routeToExternal(link.href)">
            {{ link.icon }}
          </mat-icon>
          <img *ngIf="link.img"
            [src]="link.img"
            [ngStyle]="{ height: 7.5 - (4 * headerShrinkPercentage) + 'rem' }"
            class="VeroHeader__profile-picture"
            alt="verito profile picture"
            routerLink="/" />
        </ng-container>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicHeaderComponent {
  headerShrinkPercentage = 0;
  headerConfig: HeaderConfig[] = headerConfig;
  linkFn = (index: number) => index;

  routeToExternal(link: string): void {
    window.open(link, '_blank');
  }

  onScroll(event: any) {
    const { scrollTop, scrollHeight } = event.target;
    const headerShrinkPercentage = (scrollTop * 10) / scrollHeight
    this.headerShrinkPercentage = headerShrinkPercentage > 1 ? 1 : headerShrinkPercentage;
  }
}
