/**
 * Set up Enums with inspiration from tailwindcss
 * Reference: https://tailwindcss.com/docs/font-family
 */

export enum FontStyle {
  NORMAL = 'normal',
  ITALIC = 'italic',
}

export enum FontWeight {
  THIN = 100,
  EXTRA_LIGHT = 200,
  LIGHT = 300,
  NORMAL = 400,
  MEDIUM = 500,
  SEMI_BOLD = 600,
  BOLD = 700,
  EXTRA_BOLD = 800,
  BLACK = 900,
}

export enum FontSize {
  XS = 12,
  SM = 14,
  BASE = 16,
  LG = 18,
  XL = 20,
  TWO_XL = 24,
  THREE_XL = 30,
  FOUR_XL = 36,
  FIVE_XL = 48,
  SIX_XL = 60,
  SEVEN_XL = 72,
  EIGHT_XL = 96,
  NINE_XL = 128,
}

/**
 * Relative line-heights: Use the NONE, tight, SNUG, NORMAL, RELAXED, and LOOSE to give an element a relative line-height based on its current font-size.
 * Fixed line-heights: Use the LEADING-N to give an elemetn a fixed line-height, irrespective of the current font-size (when needing very precise control)
 */
export enum LineHeight {
  NONE = 1,
  TIGHT = 1.25,
  SNUG = 1.375,
  NORMAL = 1.5,
  RELAXED = 1.625,
  LOOSE = 2,
  LEADING3 = 12,
  LEADING4 = 16,
  LEADING5 = 20,
  LEADING6 = 24,
  LEADING7 = 28,
  LEADING8 = 32,
  LEADING9 = 36,
  LEADING10 = 40,
}

export enum LetterSpacing {
  TIGHTER = -1,
  TIGHT = -0.5,
  NORMAL = 0,
  WIDE = 1,
  WIDER = 2,
  WIDEST = 4,
}

/**
 * Fonts (typography) used in the app.
 * font_name: {
 *   name: {
 *     fontFamily: FontFamily.EXAMPLE,
 *     fontStyle: FontStyle.EXAMPLE,
 *     fontWeight: FontWeight.EXAMPLE,
 *     letterSpacing: LetterSpacing.EXAMPLE,
 *     lineHeight: LineHeight.EXAMPLE,
 *   }
 * }
 * TODO: Get a designer to fix this horrendous typography config. God bless our souls.
 */
export const Fonts = {
  default: {
    normal: {},
    displayLarge: {
      fontSize: FontSize.SIX_XL,
      fontWeight: FontWeight.NORMAL,
    },
    displayMedium: {
      fontSize: FontSize.FIVE_XL,
      fontWeight: FontWeight.NORMAL,
    },
    displaySmall: {
      fontSize: FontSize.FOUR_XL,
      fontWeight: FontWeight.NORMAL,
    },
    headlineLarge: {
      fontSize: 32,
      fontWeight: FontWeight.NORMAL,
    },
    headlineMedium: {
      fontSize: 28,
      fontWeight: FontWeight.NORMAL,
    },
    headlineSmall: {
      fontSize: FontSize.TWO_XL,
      fontWeight: FontWeight.NORMAL,
    },
    titleLarge: {
      fontSize: 22,
      fontWeight: FontWeight.NORMAL,
    },
    titleMedium: {
      fontSize: FontSize.BASE,
      fontWeight: FontWeight.MEDIUM,
    },
    titleSmall: {
      fontSize: FontSize.SM,
      fontWeight: FontWeight.MEDIUM,
    },
    labelLarge: {
      fontSize: FontSize.SM,
      fontWeight: FontWeight.MEDIUM,
      letterSpacing: 0.1,
    },
    labelMedium: {
      fontSize: FontSize.XS,
      fontWeight: FontWeight.MEDIUM,
      letterSpacing: 0.5,
    },
    labelSmall: {
      fontSize: 11,
      fontWeight: FontWeight.MEDIUM,
      letterSpacing: 0.5,
    },
    bodyLarge: {
      fontSize: FontSize.BASE,
      fontWeight: FontWeight.NORMAL,
    },
    bodyMedium: {
      fontSize: FontSize.SM,
      fontWeight: FontWeight.NORMAL,
    },
    bodySmall: {
      fontSize: FontSize.XS,
      fontWeight: FontWeight.NORMAL,
    },
  },
}
