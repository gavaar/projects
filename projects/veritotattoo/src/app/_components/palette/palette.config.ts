import { CssVariableConfiguration } from './palette.models'

export const defaultRGBColors: CssVariableConfiguration = {
  teal: '0 255 206',
  tealTransparent: '0 255 206 / 0.33',
  blue: '48 140 155',
  gray: '169 169 169',
  grayTransparent: '169 169 169 / 0.33',
  darkBlue: '0 61 89',
  darkBlueTransparent: '0 61 89 / 0.33',
  purple: '81 2 93',
  purpleTransparent: '81 2 93 / 0.33',
  pink: '254 102 37',
  darkOrange: '255 154 0',
  orange: '255 154 0',
  white: '250 250 250',
  black: '10, 10, 10',
};

export const defaultVariableStyles: CssVariableConfiguration = {
  primary: 'teal',
  primaryTransparent: 'tealTransparent',
  secondary: 'darkBlue',
  secondaryLight: 'darkBlueTransparent',
  scrollbar: 'accent',
  accent: 'purple',
  accentLight: 'purpleTransparent',
  background: 'white',
  text: 'black',
};
