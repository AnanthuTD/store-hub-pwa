import asyncComponentLoader from '@/utils/loader';
import { AdminPages, AdminRoutes } from './types';
import LoginIcon from '@mui/icons-material/Login';

const adminRoutes: AdminRoutes = {
  [AdminPages.AdminSignInPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/authentication/SignIn'),
    ),
    path: '/admin/signin',
    title: 'Admin Sign In',
    icon: LoginIcon,
  },
  [AdminPages.AdminDashboardPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/dashboard')),
    path: '/admin/dashboard',
    title: 'Admin Dashboard',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminPartnerListPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/partnerAcceptance/PartnersListPage'),
    ),
    path: '/admin/partner/list/pending',
    title: 'Admin Partner List',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminPartnerValidationFormPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/partnerAcceptance/AdminValidationPage'),
    ),
    path: '/admin/partner/validate',
    title: 'Admin Partner Validation',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminVendorVerificationPendingListPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/vendor/verification/pending'),
    ),
    path: '/admin/vendor/verification/pending',
    title: 'Vendor Verification Pending',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminVendorVerificationPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/vendor/vendorDetails/VendorValidationPage'),
    ),
    path: '/admin/vendor/verify',
    title: 'Verify Vendor',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminAddCategoryPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/category/create')),
    path: '/admin/category/add',
    title: 'Add Category',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminViewCategoryPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/category/view')),
    path: '/admin/category/view',
    title: 'View Category',
    icon: LoginIcon,
    layoutType: 'admin',
  },
};

export default adminRoutes;
