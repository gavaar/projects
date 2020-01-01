import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoyButton } from '@libs/moy-button/moy-button.models';
import { loginButtons } from './login.config';
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
  buttons: { [button: string]: MoyButton };

  constructor(private store: LoginStore, private service: LoginService) {
    this.buttons = loginButtons;
  }

  onLogin(token: string) {
    this.service.setToken(token);
  }
}
