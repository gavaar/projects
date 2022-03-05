import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Changelog, MoyChangelogModule } from '@libs/moy-changelog';
import { MoyScrollbarModule } from '@libs/moy-scrollbar';
import changelog from 'assets/_static/changelog';

@Component({
  template: `
    <section moyScrollbar class="VeroChangelog body-height">
      <moy-changelog [changelog]="config"></moy-changelog>
    </section>
  `,
})
export class VeroChangelogComponent {
  config: Changelog[] = changelog;
}

@NgModule({
  imports: [
    CommonModule,
    MoyChangelogModule,
    MoyScrollbarModule,
    RouterModule.forChild([{ path: '', component: VeroChangelogComponent }]),
  ],
  declarations: [VeroChangelogComponent],
})
export class VeroChangelogModule {}
