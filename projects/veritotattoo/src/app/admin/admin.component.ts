import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoyButton } from '@libs/moy-button';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from './admin.service';

const LOGGED_OUT = {
  adminEmoji: '\uDF1A',
  promptText: 'You sure you should be here?',
  buttonText: 'Prove who you are!',
};
const LOGGED_IN = {
  adminEmoji: '\uDF1D',
  promptText: 'Oh hello there ',
  buttonText: 'Log out?',
};

@Component({
  template: `
    <section class="Admin body-height" *ngIf="(config | async) as admin">
      <router-outlet></router-outlet>
    </section>
  `,
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  private _config = new BehaviorSubject<typeof LOGGED_IN & { user: { uid?: string; name: string } } | null>(null);

  button = new MoyButton({ text: '' });
  config = this._config.asObservable();

  constructor(private adminService: AdminService) {
    adminService.userChanges.subscribe(user => {
      if (user) {
        this.updateFields(user.uid ? LOGGED_IN : LOGGED_OUT, user);
      }
    });
  }

  onLogin(): void {
    this.adminService.onLogin();
  }

  onLogout(): void {
    this.adminService.onLogout();
  }

  private updateFields(config: typeof LOGGED_IN, user = { uid: null, name: '' }): void {
    this.button = new MoyButton({ text: config.buttonText });
    this._config.next({ ...config, user });
  }
}
