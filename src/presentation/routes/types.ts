import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  SignUp,
  SignUpWithEmail,
  SignUpWithMobile,
  SignIn,
  UserHome,
  PartnerSignup,
  PartnerOTPVerification,
  PartnerProfileForm,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
  isProtected?: boolean;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
