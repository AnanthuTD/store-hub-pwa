import LoginIcon from '@mui/icons-material/Login';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.SignUp]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/user/authentication/SignUp'),
    ),
    path: '/signup',
    title: 'Sign Up',
    icon: LoginIcon,
  },
  [Pages.SignUpWithEmail]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/user/authentication/SignUp/email'),
    ),
    path: '/signup-with-email',
    title: 'Signup With Email',
    icon: LoginIcon,
  },
  [Pages.SignUpWithMobile]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/user/authentication/SignUp/phone'),
    ),
    path: '/signup-with-mobile',
    title: 'Signup With Mobile',
    icon: LoginIcon,
  },
  [Pages.SignIn]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/user/authentication/SignIn'),
    ),
    path: '/signin',
    title: 'SignIn',
    icon: LoginIcon,
  },
  [Pages.UserHome]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/home')),
    path: '/home',
    title: 'Home',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [Pages.UserProductsList]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/productsList')),
    path: '/products/list',
    title: 'Products List',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [Pages.UserProduct]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/product')),
    path: '/product',
    title: 'Product Details',
    icon: LoginIcon,
    layoutType: 'user',
  },

  // PARTNER
  [Pages.PartnerSignup]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/partner/signup/Signup')),
    path: '/partner/signup',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [Pages.PartnerOTPVerification]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/ValidateOTP'),
    ),
    path: '/partner/signup/otp-verification',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [Pages.PartnerProfileForm]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/ProfileForm'),
    ),
    path: '/partner/signup/profile',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [Pages.PartnerDocumentSubmission]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/partner/signup/Document')),
    path: '/partner/signup/document',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [Pages.PartnerPersonalDocuments]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/PersonalDocuments'),
    ),
    path: '/partner/signup/document/personal',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [Pages.RegistrationComplete]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/partner/signup/Complete')),
    path: '/partner/signup/complete',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [Pages.PartnerVehicleInformation]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/VehicleInformation'),
    ),
    path: '/partner/signup/document/vehicle',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [Pages.PartnerEmergencyInformation]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/EmergencyContactDetails'),
    ),
    path: '/partner/signup/document/emergency',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [Pages.PartnerBankAccountInformation]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/BankAccountDetails'),
    ),
    path: '/partner/signup/document/bank',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [Pages.PartnerOrder]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/partner/order')),
    path: '/partner/order',
    title: 'Partner Orders',
    icon: LoginIcon,
    layoutType: 'deliveryPartner',
  },

  // ADMIN
  [Pages.AdminSignIn]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/authentication/SignIn'),
    ),
    path: '/admin/signin',
    title: 'Admin Sign In',
    icon: LoginIcon,
  },
  [Pages.AdminDashboard]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/dashboard')),
    path: '/admin/dashboard',
    title: 'Admin Dashboard',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [Pages.AdminPartnerList]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/partnerAcceptance/PartnersListPage'),
    ),
    path: '/admin/partner/list/pending',
    title: 'Admin Sign In',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [Pages.AdminPartnerValidationForm]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/partnerAcceptance/AdminValidationPage'),
    ),
    path: '/admin/partner/validate',
    title: 'Admin Sign In',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [Pages.AdminShopOwnerVerificationPendingList]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/shopOwner/verification/pending'),
    ),
    path: '/admin/shopOwner/verification/pending',
    title: 'Admin Sign In',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [Pages.AdminVendorVerify]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/shopOwner/verification/VendorValidationPage'),
    ),
    path: '/admin/vendor/verify',
    title: 'Admin Sign In',
    icon: LoginIcon,
    layoutType: 'admin',
  },

  // SHOP OWNER
  [Pages.ShopSignUp]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/vendor/authentication/SignUp'),
    ),
    path: '/shop/signup',
    title: 'Shop Sign Up',
    icon: LoginIcon,
  },
  [Pages.ShopHomePage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/vendor/Dashboard')),
    path: '/shop/dashboard',
    title: 'Shop Home',
    icon: LoginIcon,
    layoutType: 'shopOwner',
  },
  [Pages.ShopOwnerRegister]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/vendor/RegisterShopOwner')),
    path: '/shop/owner/register',
    title: 'Shop Owner Register',
    icon: LoginIcon,
    layoutType: 'shopOwner',
  },
  [Pages.ShopSignUpWithOTP]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/vendor/authentication/SignIn'),
    ),
    path: '/shop/signin',
    title: 'Shop Owner Sign In',
    icon: LoginIcon,
  },

  // status
  [Pages.TokenVerificationStatus]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/TokenVerificationStatus')),
    path: '/token-verification-status',
    title: 'Token Verification Status',
    icon: LoginIcon,
  },
};

export default routes;
