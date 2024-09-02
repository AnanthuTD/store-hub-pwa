import React from 'react';
import { Home, Person, CreditCard } from '@mui/icons-material';
import type { MenuItem } from '@/presentation/components/SideBar';
import Sidebar from '@/presentation/components/SideBar';

function SideBarShop() {
  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: <Home fontSize="small" />,
      key: 'dashboard',
      href: '/shop/dashboard',
    },
    {
      label: 'Register',
      icon: <Home fontSize="small" />,
      key: 'register',
      href: '/shop/owner/register',
    },
    {
      label: 'New Orders',
      icon: <Home fontSize="small" />,
      key: 'newOrders',
      href: '/shop/new-orders',
    },
    { label: 'Products', icon: <Home fontSize="small" />, key: 'products', href: '/shop/products' },
    { label: 'Offers', icon: <Home fontSize="small" />, key: 'offers', href: '/shop/offers' },
    {
      label: 'Payment Overview',
      icon: <Home fontSize="small" />,
      key: 'paymentOverview',
      href: '/shop/payment-overview',
    },
    { label: 'Reports', icon: <Home fontSize="small" />, key: 'reports', href: '/shop/reports' },
    {
      label: 'Notifications',
      icon: <Home fontSize="small" />,
      key: 'notification',
      href: '/shop/notifications',
    },
    {
      label: 'Profile',
      icon: <Person fontSize="small" />,
      section: 'accounts',
      key: 'profile',
      href: '/shop/profile',
    },
    {
      label: 'Subscription',
      icon: <CreditCard fontSize="small" />,
      section: 'accounts',
      key: 'subscription',
      href: '/shop/subscription',
    },
  ];

  return <Sidebar menuItems={menuItems} />;
}

export default SideBarShop;
