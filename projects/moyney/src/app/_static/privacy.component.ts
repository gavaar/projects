import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'moy-privacy',
  templateUrl: '../../assets/static-html/privacy-policy.html',
  styles: [
    `
      .Privacy {
        padding: 0 2rem;
        text-align: center;
        overflow-y: auto;
        max-height: calc(100vh - 5.5rem);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyStatic {}
