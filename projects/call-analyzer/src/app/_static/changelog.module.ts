import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CHANGELOG } from '../../assets/static/changelog';
import { MoyChangelogModule } from '@libs/moy-changelog/moy-changelog.module';
import { RouterModule } from '@angular/router';

@Component({
  template: `
    <moy-changelog [changelog]="changelog"></moy-changelog>
  `
})
class ChangelogComponent {
  changelog = CHANGELOG;
}

@NgModule({
  imports: [
    CommonModule,
    MoyChangelogModule,
    RouterModule.forChild([{ path: '', component: ChangelogComponent }])
  ],
  declarations: [ChangelogComponent],
})
export class ChangelogModule {}
