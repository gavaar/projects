import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
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
    private store: LoginStore,
    private service: LoginService,
    private dialogRef: MatDialogRef<LoginComponent>,
  ) {
    this.buttons = loginButtons;
  }

  onLogin(provider: AuthType) {
    this.service.auth(provider).subscribe((user: firebase.auth.UserCredential) => {
      this.store.state = parseUserData(user);
      this.dialogRef.close();
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
