import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { popOut } from '@libs/animations';
import { AppConfig, AppConfigSections, AppConfigService } from '@vero-components/app-config';
import { AdminService } from 'app/admin/admin.service';
import { AsyncSubject, Observable } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';
import { headerConfig as deprecatedHeaderConfig } from './header.config';
import { HeaderConfig } from './header.models';
import { DynamicHeaderDimensions } from './_helpers/dynamic-header-dimensions';

@Component({
  selector: 'vero-header',
  template: `
    <header
      class="VeroHeader"
      (moyScrollbar)="headerDimensions.onScroll($event)">
      <div class="VeroHeader__wrapper"
        *ngIf="(config | async) as headerConfig"
        [ngStyle]="{ height: headerDimensions.imageHeight }">
        <img 
          class="VeroHeader__profile"
          alt="verito profile picture"
          [@popOut]
          [src]="headerConfig.profile.src"
          [ngStyle]="{ height: headerDimensions.imageHeight, width: headerDimensions.imageHeight }"
          (click)="onHomeClick()" />
        <img class="VeroHeader__background" [ngStyle]="{ 'border-radius': headerDimensions.borderRadius }" [src]="headerConfig.background.src" />
        <div class="VeroHeader__content">
          <ng-container *ngFor="let link of headerConfig.icons; let count =count; let i = index; trackBy: linkFn">
            <div class="VeroHeader__space" *ngIf="i === count / 2 || i === (count - 1) / 2"></div>
            <mat-icon [ngStyle]="{ 'margin-top': 0.3 + (count - (i + 1 >= ((count + 1) / 2) ? i : (count - 1) - i)) * 2 * (1 - headerDimensions.headerShrinkPercentage) + 'rem' }"
              (click)="routeToExternal(link.href)">
              {{ link.icon }}
            </mat-icon>
          </ng-container>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss', '../../_styles/_header.common.scss'],
  animations: [popOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicHeaderComponent implements OnInit, OnDestroy {
  config: Observable<AppConfig[AppConfigSections.Header]>;
  headerDimensions = new DynamicHeaderDimensions();
  deprecatedHeaderConfig: HeaderConfig[] = deprecatedHeaderConfig;
  linkFn = (index: number) => index;

  private _destroy$ = new AsyncSubject();

  constructor(private router: Router, private adminService: AdminService, private configService: AppConfigService) {}

  ngOnInit(): void {
    this.resetHeaderOnRouting();
    this.config = this.configService.get().pipe(map(config => config[AppConfigSections.Header]));
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  onHomeClick(): void {
    let route = '';
    if (this.adminService.currentUser.admin && !this.router.url.includes('/admin')) {
      route = 'admin';
    }

    this.router.navigateByUrl(`/${route}`);
  }

  routeToExternal(link: string): void {
    window.open(link, '_blank');
  }

  private resetHeaderOnRouting(): void {
    this.router.events.pipe(
      takeUntil(this._destroy$),
      filter(e => e instanceof NavigationEnd),
      debounceTime(500),
    ).subscribe(() => this.headerDimensionsRefreshByDocument());
  }

  private headerDimensionsRefreshByDocument() {
    const target = document.getElementsByTagName('section')[0];
    this.headerDimensions.onScroll({ target });
  };
}
