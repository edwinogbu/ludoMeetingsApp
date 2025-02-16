/**
 * Below are the colors used in the app, defined for both light and dark modes.
 * You can also style your app using libraries like:
 * - [Nativewind](https://www.nativewind.dev/)
 * - [Tamagui](https://tamagui.dev/)
 * - [Unistyles](https://reactnativeunistyles.vercel.app)
 */

const primary = '#4CAF50';
const secondary = '#0A7EA4';
const tintColorLight = secondary;
const tintColorDark = '#FFFFFF';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  primary,
  secondary,
};
