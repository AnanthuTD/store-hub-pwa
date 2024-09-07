import React from 'react';
import { Home, Person, CreditCard } from '@mui/icons-material';
import type { MenuItem } from '@/presentation/components/SideBar';
import Sidebar from '@/presentation/components/SideBar';

function SideBarAdmin() {
  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: <Home fontSize="small" />,
      key: 'dashboard',
      href: '/admin/dashboard',
    },
    {
      label: 'Un-verified Partner',
      icon: <Home fontSize="small" />,
      key: 'un-verified-partner',
      href: '/admin/partner/list',
    },
    {
      label: 'User',
      icon: <Home fontSize="small" />,
      key: 'user',
      href: '/admin/user',
    },
    {
      label: 'Shops',
      icon: <Home fontSize="small" />,
      key: 'shops',
      href: '/admin/shops',
    },
    {
      label: 'Products',
      icon: <Home fontSize="small" />,
      key: 'products',
      href: '/admin/products',
    },
    { label: 'Offers', icon: <Home fontSize="small" />, key: 'offers', href: '/admin/offers' },
    { label: 'Coupons', icon: <Home fontSize="small" />, key: 'coupons', href: '/admin/coupons' },
    {
      label: 'Category',
      icon: <Home fontSize="small" />,
      key: 'category',
      href: '/admin/category',
    },
    {
      label: 'Payment Overview',
      icon: <Home fontSize="small" />,
      key: 'reports',
      href: '/admin/reports',
    },
    {
      label: 'Reports',
      icon: <Home fontSize="small" />,
      key: 'reports',
      href: '/admin/payment-overview',
    },
    {
      label: 'Notifications',
      icon: <Person fontSize="small" />,
      section: 'main',
      key: 'notifications',
      href: '/admin/notifications',
    },
    {
      label: 'Delivery',
      icon: <CreditCard fontSize="small" />,
      section: 'main',
      key: 'delivery',
      href: '/admin/delivery',
    },
    {
      label: 'Referrals',
      icon: <CreditCard fontSize="small" />,
      section: 'main',
      key: 'referrals',
      href: '/admin/referrals',
    },
    {
      label: 'Profile',
      icon: <CreditCard fontSize="small" />,
      section: 'accounts',
      key: 'profile',
      href: '/admin/profile',
    },
  ];

  return <Sidebar menuItems={menuItems} />;
}

export default SideBarAdmin;
