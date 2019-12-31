import { MoyButton } from '@libs/moy-button/moy-button.models';

const loginButtons = {
  google: new MoyButton({
    svgIcon: 'google',
    text: 'Sign in with Google',
  }),
  facebook: new MoyButton({
    svgIcon: 'facebook',
    text: 'Sign in with Facebook',
  }),
};

export { loginButtons };
