import { create } from '@storybook/theming/create';
// @ts-ignore
import logo from './logo.svg'

// --color-yellow: #f9ea35;
// --color-green: #85de76;
// --color-blue: #96daea;
// --color-red: #f36279;
// --color-black: #101820;
// --color-gray: #f4f4f4;
// --color-gray-100: #d8d8d8;
// --color-dark-gray: #1d252c;
// --color-white: #fff;

export const wtcTheme = create({
  base: 'dark',
  brandTitle: 'We The Collective',
  brandUrl: 'https://wethecollective.com',
  brandImage: logo,
  brandTarget: '_self',

  colorPrimary: '#85de76',
  colorSecondary: '#f9ea35',

  appBg: "#101820",
  appContentBg: "#101820",
  appBorderColor: "#1d252c",

  // fontBase: "string",
  // fontCode: "string",

  textColor: "#fff",
  textInverseColor: "#101820",
  textMutedColor: "#d8d8d8",

  // barTextColor: "string",
  barHoverColor: "#f9ea35",
  barSelectedColor: "#f9ea35",
  barBg: "#1d252c",

  buttonBg: "#1d252c",
  buttonBorder: "#101820",

  // booleanBg: "string",
  // booleanSelectedBg: "string",

  inputBg: "#1d252c",
  inputBorder: "#101820",
  // inputTextColor: "string",
  // inputBorderRadius: "number",
});