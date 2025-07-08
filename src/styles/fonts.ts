/**
 * Font weights following MDN guidelines
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
 */
export const fontWeight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const;

/**
 * Font size tokens using rem units for better scalability
 * Base: 1rem = 16px (browser default)
 */
export const fontSize = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  base: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.75rem', // 28px
  '4xl': '2rem', // 32px
  '5xl': '2.25rem', // 36px
  '6xl': '3rem', // 48px
} as const;
