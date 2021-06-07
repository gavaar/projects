import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { popOut } from '@libs/animations';
import { debounceTime, filter } from 'rxjs/operators';
import { headerConfig } from './header.config';
import { HeaderConfig } from './header.models';
import { DynamicHeaderDimensions } from './_helpers/dynamic-header-dimensions';

@Component({
  selector: 'vero-header',
  template: `
    <header
      class="VeroHeader"
      (moyScrollbar)="headerDimensions.onScroll($event)">
      <div class="VeroHeader__wrapper">
        <span [ngStyle]="{ 'border-radius': headerDimensions.borderRadius }"
          class="VeroHeader__background">
        </span>

        <div class="VeroHeader__content">
          <ng-container *ngFor="let link of headerConfig; let i = index; trackBy: linkFn">
            <mat-icon *ngIf="link.icon"
              [ngStyle]="{ 'margin-top': 0.3 + ((1 - headerDimensions.headerShrinkPercentage) * (3.5 + i % 2)) + 'rem' }"
              (click)="routeToExternal(link.href)">
              {{ link.icon }}
            </mat-icon>
            <img *ngIf="link.img"
              [@popOut]
              [src]="link.img"
              [ngStyle]="{ height: headerDimensions.imageHeight }"
              class="VeroHeader__profile-picture"
              alt="verito profile picture"
              routerLink="/" />
          </ng-container>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
  animations: [popOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicHeaderComponent {
  headerDimensions = new DynamicHeaderDimensions();
  headerConfig: HeaderConfig[] = headerConfig;
  linkFn = (index: number) => index;

  constructor(router: Router) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      debounceTime(500),
    ).subscribe(() => {
      this.headerDimensionsRefreshByDocument();
    });
  }

  routeToExternal(link: string): void {
    window.open(link, '_blank');
  }

  private headerDimensionsRefreshByDocument() {
    const target = document.getElementsByTagName('section')[0];
    this.headerDimensions.onScroll({ target });
  };
}
