import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

function AuthThemeProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();

  const themeCustom = createTheme({
    ...theme,
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });

  return <ThemeProvider theme={themeCustom}>{children}</ThemeProvider>;
}

export default AuthThemeProvider;
