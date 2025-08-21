// src/theme/Theme.ts
type Mode = 'light' | 'dark';

const lightPalette = {
  bg: '#FFFFFF',
  onBg: '#000000',
  mutedOnBg: '#475467',
};

const darkPalette = {
  bg: '#000000',
  onBg: '#FFFFFF',
  mutedOnBg: '#D0D5DD',
};

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
    // default start in light mode
    bg: lightPalette.bg,
    // Text intended for background surfaces
    onBg: lightPalette.onBg,
    mutedOnBg: lightPalette.mutedOnBg,
    error: '#F04438',
    success: '#12B76A',
    warning: '#F79009',
    pink: '#FF69B4',
    danger: '#F04438',
  },
  mode: 'light' as Mode,
  setMode(next: Mode) {
    // mutate palette so existing imports update
    const p = next === 'dark' ? darkPalette : lightPalette;
    this.colors.bg = p.bg;
    this.colors.onBg = p.onBg;
    this.colors.mutedOnBg = p.mutedOnBg;
    this.mode = next;
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
