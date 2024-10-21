import asyncComponentLoader from '@/utils/loader';
import { VendorPages, VendorRoutes } from './types';
import LoginIcon from '@mui/icons-material/Login';

const vendorRoutes: VendorRoutes = {
  [VendorPages.VendorSignUpPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/vendor/authentication/SignUp'),
    ),
    path: '/vendor/signup',
    title: 'Shop Sign Up',
    icon: LoginIcon,
  },
  [VendorPages.VendorHomePage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/vendor/Dashboard')),
    path: '/vendor/dashboard',
    title: 'Shop Home',
    icon: LoginIcon,
    layoutType: 'vendor',
  },
  [VendorPages.VendorRegisterPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/vendor/RegisterShopOwner')),
    path: '/vendor/owner/register',
    title: 'Shop Owner Register',
    icon: LoginIcon,
    layoutType: 'vendor',
  },
  [VendorPages.VendorSignInPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/vendor/authentication/SignIn'),
    ),
    path: '/vendor/signin',
    title: 'Shop Owner Sign In',
    icon: LoginIcon,
  },
  [VendorPages.VendorAddProductsPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/vendor/products/add')),
    path: '/vendor/products/add',
    title: 'Add Products',
    icon: LoginIcon,
    layoutType: 'vendor',
  },
  [VendorPages.VendorEditProductsPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/vendor/products/manage')),
    path: '/vendor/products/manage',
    title: 'Manage Products',
    icon: LoginIcon,
    layoutType: 'vendor',
  },
  [VendorPages.VendorShopRegistrationPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/vendor/shop/register/ShopRegistrationForm'),
    ),
    path: '/vendor/shop/register',
    title: 'Shop Registration',
    icon: LoginIcon,
    layoutType: 'vendor',
  },
  [VendorPages.VendorOrderListPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/vendor/order')),
    path: '/vendor/orders',
    title: 'Shop Registration',
    icon: LoginIcon,
    layoutType: 'vendor',
  },
  [VendorPages.VendorReturnRequestPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/vendor/order/ReturnRequestedItems'),
    ),
    path: '/vendor/orders/return/requested',
    title: 'Shop Registration',
    icon: LoginIcon,
    layoutType: 'vendor',
  },
  [VendorPages.VendorReturnedItemPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/vendor/order/ReturnedItemList'),
    ),
    path: '/vendor/orders/returned',
    title: 'Shop Registration',
    icon: LoginIcon,
    layoutType: 'vendor',
  },
  [VendorPages.VendorCollectedItemPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/vendor/order/completed')),
    path: '/vendor/orders/collected',
    title: 'Shop Registration',
    icon: LoginIcon,
    layoutType: 'vendor',
  },
  [VendorPages.VendorTransactionsPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/vendor/transactions/WalletPage'),
    ),
    path: '/vendor/transactions',
    title: 'Transactions',
    icon: LoginIcon,
    layoutType: 'vendor',
  },
  [VendorPages.VendorReportPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/vendor/report')),
    path: '/vendor/reports',
    title: 'Report',
    icon: LoginIcon,
    layoutType: 'vendor',
  },

  [VendorPages.VendorSubscriptionPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/vendor/subscription/SubscriptionPage'),
    ),
    path: '/vendor/subscription',
    title: 'Subscription',
    icon: LoginIcon,
    layoutType: 'vendor',
  },
};

export default vendorRoutes;
