import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: '../../assets/_static/privacy-policy.html',
})
export class PrivacyPolicyComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: PrivacyPolicyComponent }]),
  ],
  declarations: [PrivacyPolicyComponent],
})
export class PrivacyPolicyModule {}
