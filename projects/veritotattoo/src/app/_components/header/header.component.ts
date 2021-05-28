import { ChangeDetectionStrategy, Component } from '@angular/core';
import { headerConfig } from './header.config';
import { HeaderConfig } from './header.models';

@Component({
  selector: 'vero-header',
  template: `
    <header class="VeroHeader" (moyScrollbar)="onScroll($event)">
      <div class="VeroHeader__wrapper">
        <span [ngStyle]="{ 'border-radius': borderRadius }"
          class="VeroHeader__background">
        </span>

        <div class="VeroHeader__content">
          <ng-container *ngFor="let link of headerConfig; let i = index; trackBy: linkFn">
            <mat-icon *ngIf="link.icon"
              [ngStyle]="{ 'margin-top': 0.3 + ((1 - headerShrinkPercentage) * (3.5 + i % 2)) + 'rem' }"
              (click)="routeToExternal(link.href)">
              {{ link.icon }}
            </mat-icon>
            <img *ngIf="link.img"
              [src]="link.img"
              [ngStyle]="{ height: imageHeight }"
              class="VeroHeader__profile-picture"
              alt="verito profile picture"
              routerLink="/" />
          </ng-container>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicHeaderComponent {
  headerShrinkPercentage = 0;
  borderRadius = '0 0 50% 50%';
  imageHeight = '7.5rem';
  headerConfig: HeaderConfig[] = headerConfig;
  linkFn = (index: number) => index;

  routeToExternal(link: string): void {
    window.open(link, '_blank');
  }

  onScroll(event: any) {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const headerShrinkPercentage = (scrollTop * 4) / (scrollHeight - clientHeight)
    this.headerShrinkPercentage = headerShrinkPercentage > 1 ? 1 : headerShrinkPercentage;
    
    const borderRadiusPercentage = 50 - 50 * this.headerShrinkPercentage;
    this.borderRadius = `0 0 ${borderRadiusPercentage}% ${borderRadiusPercentage}%`;

    this.imageHeight = `${7.5 - (4 * this.headerShrinkPercentage)}rem`;
  }
}
