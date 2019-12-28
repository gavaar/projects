import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoyButton } from '@libs/moy-button/moy-button.models';

@Component({
  selector: 'moy-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  buttons = {
    google: new MoyButton({
      svgIcon: 'google',
      click: () => {
        alert('I clicked google!');
      },
      text: 'Sign in with Google',
    }),
    facebook: new MoyButton({
      svgIcon: 'facebook',
      click: () => {
        alert('I clicked facebook!');
      },
      text: 'Sign in with Facebook',
    }),
  };
}
