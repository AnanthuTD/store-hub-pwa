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
  PartnerDocumentSubmission,
  PartnerPersonalDocuments,
  PartnerAadhar,
  RegistrationComplete,
  PartnerVehicleInformation,
  PartnerBankAccountInformation,
  PartnerEmergencyInformation,

  AdminSignIn,

  ShopSignUp,
  ShopSignUpWithOTP,
  ShopSignIn,
  ShopHomePage,
  ShopOwnerRegister,

  TokenVerificationStatus,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
  isProtected?: boolean;
  layoutType?: 'user' | 'admin' | 'shopOwner' | 'deliveryPartner';
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type LayoutType = PathRouteCustomProps['layoutType'];

export type { Routes };
export { Pages };
