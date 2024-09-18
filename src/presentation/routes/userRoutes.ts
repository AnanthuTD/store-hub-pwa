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
};

export default userRoutes;
