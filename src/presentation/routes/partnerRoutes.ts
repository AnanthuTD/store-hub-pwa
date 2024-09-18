import asyncComponentLoader from '@/utils/loader';
import { PartnerPages, PartnerRoutes } from './types';
import LoginIcon from '@mui/icons-material/Login';

const partnerRoutes: PartnerRoutes = {
  [PartnerPages.PartnerSignUpPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/partner/signup/Signup')),
    path: '/partner/signup',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [PartnerPages.PartnerOTPVerificationPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/ValidateOTP'),
    ),
    path: '/partner/signup/otp-verification',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [PartnerPages.PartnerProfileFormPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/ProfileForm'),
    ),
    path: '/partner/signup/profile',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [PartnerPages.PartnerDocumentSubmissionPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/partner/signup/Document')),
    path: '/partner/signup/document',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [PartnerPages.PartnerPersonalDocumentsPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/PersonalDocuments'),
    ),
    path: '/partner/signup/document/personal',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [PartnerPages.PartnerRegistrationCompletePage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/partner/signup/Complete')),
    path: '/partner/signup/complete',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [PartnerPages.PartnerVehicleInformationPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/VehicleInformation'),
    ),
    path: '/partner/signup/document/vehicle',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [PartnerPages.PartnerEmergencyInformationPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/EmergencyContactDetails'),
    ),
    path: '/partner/signup/document/emergency',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [PartnerPages.PartnerBankAccountInformationPage]: {
    component: asyncComponentLoader(
      () => import('@/presentation/pages/partner/signup/BankAccountDetails'),
    ),
    path: '/partner/signup/document/bank',
    title: 'Partner SignUp',
    icon: LoginIcon,
  },
  [PartnerPages.PartnerOrderPage]: {
    component: asyncComponentLoader(() => import('@/presentation/pages/partner/order')),
    path: '/partner/order',
    title: 'Partner Orders',
    icon: LoginIcon,
    layoutType: 'deliveryPartner',
  },
};

export default partnerRoutes;
