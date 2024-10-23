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
  [AdminPages.AdminSalesReportPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/report/SalesReport')),
    path: '/admin/reports',
    title: 'Sales Report',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminUnverifiedPartnerListPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/deliveryPartner/verification/Unverified'),
    ),
    path: '/admin/partner/list/unverified',
    title: 'Admin Partner List',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminVerifiedPartnerListPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/deliveryPartner/verification/Verified'),
    ),
    path: '/admin/partner/list/verified',
    title: 'Admin Partner List',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminPartnerValidationFormPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/deliveryPartner/verification/PartnerValidationPage'),
    ),
    path: '/admin/partner/validate',
    title: 'Admin Partner Validation',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminVendorUnverifiedListPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/vendor/verification/unverified'),
    ),
    path: '/admin/vendor/verification/unverified',
    title: 'Vendor Verification Pending',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminVendorVerifiedListPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/vendor/verification/verified'),
    ),
    path: '/admin/vendor/verification/verified',
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
  [AdminPages.AdminAddCouponPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/coupon/AddCoupon')),
    path: '/admin/coupons/add',
    title: 'Add Coupon',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminViewCouponPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/coupon/ViewCoupons')),
    path: '/admin/coupons/view',
    title: 'Add Coupon',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminUsersListingPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/users')),
    path: '/admin/users',
    title: 'Users List',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminStoreListingPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/stores/StoreListPage'),
    ),
    path: '/admin/stores',
    title: 'Users List',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminStoreProductListingPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/stores/StoreDetails')),
    path: '/admin/store/details',
    title: 'Users List',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminOrderListingPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/orders')),
    path: '/admin/orders',
    title: 'Order List',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminChatPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/chat/ChatPage')),
    path: '/admin/chat',
    title: 'Order List',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminSubscriptionManagementPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/admin/subscription')),
    path: '/admin/subscription',
    title: 'Subscription',
    icon: LoginIcon,
    layoutType: 'admin',
  },
  [AdminPages.AdminNotificationPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/admin/AdminNotificationPage'),
    ),
    path: '/admin/notifications',
    title: 'Notifications',
    icon: LoginIcon,
    layoutType: 'admin',
  },
};

export default adminRoutes;
