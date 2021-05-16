import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Changelog, MoyChangelogModule } from '@libs/moy-changelog';
import changelog from 'assets/_static/changelog';

@Component({
  template: `<moy-changelog [changelog]="config"></moy-changelog>`
})
export class VeroChangelogComponent {
  config: Changelog[] = changelog;
}

@NgModule({
  imports: [
    CommonModule,
    MoyChangelogModule,
    RouterModule.forChild([{ path: '', component: VeroChangelogComponent }]),
  ],
  declarations: [VeroChangelogComponent],
})
export class VeroChangelogModule {}
