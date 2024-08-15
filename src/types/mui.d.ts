// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ButtonPropsColorOverrides } from '@mui/material/Button';

// This is your global type augmentation for the Button component
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    slateBlue?: true;
  }
}
