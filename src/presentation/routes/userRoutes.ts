import asyncComponentLoader from '@/utils/loader';
import { UserPages, UserRoutes } from './types';
import LoginIcon from '@mui/icons-material/Login';

const userRoutes: UserRoutes = {
  [UserPages.UserLandingPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/landing')),
    path: '/',
    title: 'StoreHub',
    icon: LoginIcon,
  },
  [UserPages.UserSignUpPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/user/authentication/SignUp'),
    ),
    path: '/signup',
    title: 'Sign Up',
    icon: LoginIcon,
  },
  [UserPages.UserSignUpWithEmailPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/user/authentication/SignUp/email'),
    ),
    path: '/signup-with-email',
    title: 'Signup With Email',
    icon: LoginIcon,
  },
  [UserPages.UserSignUpWithMobilePage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/user/authentication/SignUp/phone'),
    ),
    path: '/signup-with-mobile',
    title: 'Signup With Mobile',
    icon: LoginIcon,
  },
  [UserPages.UserSignInPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/user/authentication/SignIn'),
    ),
    path: '/signin',
    title: 'SignIn',
    icon: LoginIcon,
  },
  [UserPages.UserHomePage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/home')),
    path: '/home',
    title: 'Home',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [UserPages.UserProductsListPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/productsList')),
    path: '/products/list',
    title: 'Products List',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [UserPages.UserProductDetailsPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/product')),
    path: '/product',
    title: 'Product Details',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [UserPages.UserCartPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/cart')),
    path: '/cart',
    title: 'Cart',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [UserPages.UserCheckoutPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/checkout')),
    path: '/checkout',
    title: 'Checkout',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [UserPages.UserPaymentSuccessPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/user/payment/PaymentSuccess'),
    ),
    path: '/payment/success',
    title: 'Payment Success',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [UserPages.UserOrdersPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/orders')),
    path: '/orders',
    title: 'Orders Page',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [UserPages.UserWalletPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/wallet')),
    path: '/wallet',
    title: 'Wallet Page',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [UserPages.UserOrderTrackingPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/orderTracking')),
    path: '/orderTracking',
    title: 'Order Tracking',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [UserPages.UserShopDetailsPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/shop')),
    path: '/shop/details',
    title: 'Shop Details',
    icon: LoginIcon,
    layoutType: 'user',
  },
  [UserPages.UserChatPagePage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/chat/ChatPage')),
    path: '/chat',
    title: 'Chat Page',
    icon: LoginIcon,
    layoutType: 'user',
  },
};

export default userRoutes;
