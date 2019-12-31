import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MoyButton } from '@libs/moy-button/moy-button.models';
import { LoginComponent } from './login.component';
import { loginButtons } from './login.config';
import { LoginStore } from './login.store';

@Injectable()
export class LoginService {
  constructor(private store: LoginStore, private dialog: MatDialogRef<LoginComponent>) {}

  getLoginButtons(): { [button: string]: MoyButton } {
    const _buttons = loginButtons;
    _buttons.facebook.click = () => {
      this.store.state = { token: 'facebook' };
      this.dialog.close();
    };
    _buttons.google.click = () => {
      this.store.state = { token: 'google' };
      this.dialog.close();
    };

    return _buttons;
  }
}
