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
    <section class="Admin" *ngIf="(config | async) as admin">
      <div class="Admin__header">
        <span class="Admin__emoji">\uD83C{{admin.adminEmoji}}</span>
        <p class="Admin__text">{{admin.promptText + admin.user.name}}</p>
        <moy-button [config]="button" (click)="admin.user.uid ? onLogout() : onLogin()"></moy-button>
      </div>

      <admin-toolset *ngIf="admin.user.admin"></admin-toolset>
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

  // template bound logic
  onLogin(): void {
    this.adminService.onLogin();
  }

  onLogout(): void {
    this.adminService.onLogout();
  }

  // private
  private updateFields(config: typeof LOGGED_IN, user = { uid: null, name: '' }): void {
    this.button = new MoyButton({ text: config.buttonText });
    this._config.next({ ...config, user });
  }
}
