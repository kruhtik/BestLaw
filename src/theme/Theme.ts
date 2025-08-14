// src/theme/Theme.ts
export const theme = {
  colors: {
    primary: '#7F56D9',
    primaryLight: '#F9F5FF',
    primaryDark: '#6941C6',
    text: '#101828',
    textSecondary: '#475467',
    muted: '#667085',
    inputBg: '#F9FAFB',
    inputPlaceholder: '#98A2B3',
    border: '#EAECF0',
    card: '#FFFFFF',
    bg: '#E6F0FF',
    error: '#F04438',
    success: '#12B76A',
    warning: '#F79009',
    pink: '#FF69B4',
    danger: '#F04438',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  text: {
    xs: { fontSize: 12, lineHeight: 18 },
    sm: { fontSize: 14, lineHeight: 20 },
    base:{ fontSize: 16, lineHeight: 24 },
    lg: { fontSize: 18, lineHeight: 28 },
    xl: { fontSize: 20, lineHeight: 30 },
    '2xl': { fontSize: 24, lineHeight: 32 },
  },

  // ✅ add this
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6, // Android
    },
  },
} as const;

export type Theme = typeof theme;
export default theme; // optional default export so you can import either way
