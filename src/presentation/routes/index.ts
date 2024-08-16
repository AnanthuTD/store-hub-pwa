import LoginIcon from '@mui/icons-material/Login';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.SignUp]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/auth/SignUp')),
    path: '/signup',
    title: 'Sign Up',
    icon: LoginIcon,
  },
  [Pages.SignUpWithEmail]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/auth/SignUp/withEmail')),
    path: '/signup-with-email',
    title: 'Signup With Email',
    icon: LoginIcon,
  },
  [Pages.SignUpWithMobile]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/auth/SignUp/withMobile')),
    path: '/signup-with-mobile',
    title: 'Signup With Mobile',
    icon: LoginIcon,
  },
  [Pages.SignIn]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/auth/SignIn')),
    path: '/signin',
    title: 'SignIn',
    icon: LoginIcon,
  },
  [Pages.UserHome]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/user/Home')),
    path: '/home',
    title: 'Home',
    icon: LoginIcon,
  },
  [Pages.PartnerSignup]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/partner/PartnerSignup')),
    path: '/partner/signup',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [Pages.PartnerOTPVerification]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/PartnerValidateOTP'),
    ),
    path: '/partner/signup/otp-verification',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
};

export default routes;
