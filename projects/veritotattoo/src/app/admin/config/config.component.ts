import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MoyButton } from '@libs/moy-button';

@Component({
  template: `<article>
    <moy-button [config]="backButton" (click)="goBack()"></moy-button>
    <p>Config here</p>
  </article>`,
})
export class ConfigComponent {
  backButton = new MoyButton({ text: '👈 Back to admin' });

  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
