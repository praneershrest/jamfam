/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'
const tintColorDark = '#fff'

export const Colors = {
  black: '#000000',
  white: '#ffffff',
  input: 'rgba(151, 151, 151, 0.25)',
  light: {
    text: '#11181C',
    background: '#fff',
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
  buttonGradientLight: {
    primary: '#FF8C00',
    secondary: '#fdf542',
    underlay: '#FFEF5A',
  },
  buttonGradientDark: {
    primary: '#000080',
    secondary: '#4B0082',
    underlay: '#000080',
  },
}
