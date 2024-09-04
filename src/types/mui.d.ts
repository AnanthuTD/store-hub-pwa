/* eslint-disable @typescript-eslint/no-unused-vars */
// src/theme/types.ts
import {
  PaletteOptions,
  PaletteColorOptions,
  PaletteColor,
  ThemeOptions,
} from '@mui/material/styles';
import { ButtonPropsColorOverrides } from '@mui/material/Button';

// Extend PaletteOptions to include custom colors
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    userPrimary?: PaletteColorOptions;
    slateBlue?: PaletteColorOptions;
  }

  interface Palette {
    userPrimary: PaletteColor;
    slateBlue: PaletteColor;
  }
}

// Allow custom colors in ThemeOptions
declare module '@mui/material/styles' {
  interface Theme {
    palette: Palette & {
      userPrimary: PaletteColor;
      slateBlue: PaletteColor;
    };
  }

  interface Palette {
    userPrimary: Palette;
  }
  interface PaletteOptions {
    userPrimary: PaletteOptions;
  }

  interface ThemeOptions {
    palette?: PaletteOptions & {
      userPrimary?: PaletteColorOptions;
      slateBlue?: PaletteColorOptions;
    };
  }
}

// Allow custom color in ButtonProps
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    userPrimary?: true;
    slateBlue?: true;
  }
}
