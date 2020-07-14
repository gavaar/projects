import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: '../../assets/static/privacy-policy.html',
  styles: [
    `
      .Privacy {
        padding: 0 2rem;
        text-align: center;
        overflow-y: auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PrivacyStaticComponent {}

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: PrivacyStaticComponent }])],
  declarations: [PrivacyStaticComponent],
})
export class PrivacyStaticModule {}
