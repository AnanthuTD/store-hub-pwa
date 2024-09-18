import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

// User Pages Enum
enum UserPages {
  UserLandingPage,
  UserSignUpPage,
  UserSignUpWithEmailPage,
  UserSignUpWithMobilePage,
  UserSignInPage,
  UserHomePage,
  UserProductsListPage,
  UserProductDetailsPage,
}

// Partner Pages Enum
enum PartnerPages {
  PartnerSignUpPage,
  PartnerOTPVerificationPage,
  PartnerProfileFormPage,
  PartnerDocumentSubmissionPage,
  PartnerPersonalDocumentsPage,
  PartnerRegistrationCompletePage,
  PartnerVehicleInformationPage,
  PartnerBankAccountInformationPage,
  PartnerEmergencyInformationPage,
  PartnerOrderPage,
}

// Admin Pages Enum
enum AdminPages {
  AdminSignInPage,
  AdminDashboardPage,
  AdminPartnerListPage,
  AdminPartnerValidationFormPage,
  AdminVendorVerificationPendingListPage,
  AdminVendorVerificationPage,
  AdminAddCategoryPage,
  AdminViewCategoryPage,
}

// Vendor Pages Enum
enum VendorPages {
  VendorSignUpPage,
  VendorSignInPage,
  VendorHomePage,
  VendorRegisterPage,
  VendorAddProductsPage,
  VendorEditProductsPage,
  VendorShopRegistrationPage,
}

// Common Pages Enum
enum CommonPages {
  TokenVerificationStatusPage,
}

// Custom Path Route Props
type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
  layoutType?: 'user' | 'admin' | 'vendor' | 'deliveryPartner';
};

// Defining Route Records for Each Page Enum
type UserRoutes = Record<UserPages, PathRouteProps & PathRouteCustomProps>;
type PartnerRoutes = Record<PartnerPages, PathRouteProps & PathRouteCustomProps>;
type AdminRoutes = Record<AdminPages, PathRouteProps & PathRouteCustomProps>;
type VendorRoutes = Record<VendorPages, PathRouteProps & PathRouteCustomProps>;
type CommonRoutes = Record<CommonPages, PathRouteProps & PathRouteCustomProps>;

// Combine All Routes into a Single Type
type Routes = UserRoutes & PartnerRoutes & AdminRoutes & VendorRoutes & CommonRoutes;

// Layout Type Alias
export type LayoutType = PathRouteCustomProps['layoutType'];

// Exporting Enums and Routes Type
export type { Routes, UserRoutes, VendorRoutes, CommonRoutes, AdminRoutes, PartnerRoutes };
export { UserPages, PartnerPages, AdminPages, VendorPages, CommonPages };
