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
  PartnerOrder,

  AdminSignIn,
  AdminPartnerValidationForm,
  AdminPartnerList,
  AdminDashboard,
  AdminShopOwnerVerificationPendingList,
  AdminVendorVerify,
  AddCategory,
  ViewCategory,

  ShopSignUp,
  ShopSignUpWithOTP,
  ShopSignIn,
  ShopHomePage,
  ShopOwnerRegister,
  VendorAddProducts,
  VendorEditProducts,

  TokenVerificationStatus,

  // user
  UserProductsList,
  UserProduct,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
  layoutType?: 'user' | 'admin' | 'shopOwner' | 'deliveryPartner';
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type LayoutType = PathRouteCustomProps['layoutType'];

export type { Routes };
export { Pages };
