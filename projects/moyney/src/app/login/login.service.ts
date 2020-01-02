import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MoyButton } from '@libs/moy-button/moy-button.models';
import { LoginComponent } from './login.component';
import { LoginStore } from './login.store';

@Injectable()
export class LoginService {
  constructor(private store: LoginStore, private dialog: MatDialogRef<LoginComponent>) {}

  setToken(token: string) {
    this.store.state = { token };
    this.dialog.close();
  }
}
