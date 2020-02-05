import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MoyButton } from '@libs/moy-button/moy-button.models';
import { loginButtons } from './login.config';
import { AuthType } from './login.models';
import { LoginService } from './login.service';
import { LoginStore } from './login.store';

@Component({
  selector: 'moy-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginStore, LoginService],
})
export class LoginComponent {
  authType = AuthType;
  buttons: { [button: string]: MoyButton };

  constructor(
    private _store: LoginStore,
    private _service: LoginService,
    private _dialogRef: MatDialogRef<LoginComponent>,
    private _snack: MatSnackBar,
  ) {
    this.buttons = loginButtons;
  }

  onLogin(provider: AuthType) {
    this._service.auth(provider).subscribe((user: firebase.auth.UserCredential) => {
      this._store.state = parseUserData(user);
      this._dialogRef.afterClosed().subscribe(() => {
        this._snack.open('Logged out');
      });
      this._dialogRef.close();
    });
  }
}

function parseUserData(user: firebase.auth.UserCredential) {
  const { displayName, uid, photoURL } = user.user;
  const accessToken = user.credential['accessToken'];

  return {
    user: { uid, displayName, photoURL },
    token: accessToken,
  };
}
