import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MoyButton } from '@libs/moy-button';

@Component({
  selector: 'admin-toolset',
  template: `
    <article class="AdminToolset">
      <p>Something you want to do?</p>
      <div class="AdminToolset__buttons">
        <moy-button [config]="uploaderButton" (click)="routeTo('uploader')"></moy-button>
        <moy-button [config]="config" (click)="routeTo('config')"></moy-button>
      </div>
    </article>
  `,
  styleUrls: ['./admin-toolset.component.scss'],
})
export class AdminToolsetComponent {
  uploaderButton = new MoyButton({ text: 'Upload pics' });
  config = new MoyButton({ text: 'Config' });

  constructor(private router: Router) {}

  routeTo(route: string): void {
    this.router.navigateByUrl(`admin/${route}`);
  }
}
