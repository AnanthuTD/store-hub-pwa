import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  landingPage,

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
  PartnerOrder,

  AdminSignIn,
  AdminPartnerValidationForm,
  AdminPartnerList,
  AdminDashboard,
  AdminVendorVerificationPendingList,
  AdminVendorVerify,
  AddCategory,
  ViewCategory,

  VendorSignUp,
  VendorSignUpWithOTP,
  VendorSignIn,
  VendorHomePage,
  VendorRegister,
  VendorAddProducts,
  VendorEditProducts,
  RegisterShop,

  TokenVerificationStatus,

  // user
  UserProductsList,
  UserProduct,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
  layoutType?: 'user' | 'admin' | 'vendor' | 'deliveryPartner';
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type LayoutType = PathRouteCustomProps['layoutType'];

export type { Routes };
export { Pages };
