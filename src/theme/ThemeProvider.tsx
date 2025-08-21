// src/theme/ThemeProvider.tsx
import React from 'react';
import theme from './Theme';

export type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  mode: ThemeMode;
  colors: typeof theme.colors;
  setMode: (m: ThemeMode) => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  mode: theme.mode as ThemeMode,
  colors: theme.colors,
  setMode: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = React.useState<ThemeMode>(theme.mode as ThemeMode);

  const setMode = React.useCallback((m: ThemeMode) => {
    theme.setMode(m);
    setModeState(m);
  }, []);

  const value = React.useMemo(
    () => ({ mode, colors: { ...theme.colors }, setMode }),
    [mode, setMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => React.useContext(ThemeContext);

export default ThemeContext;
