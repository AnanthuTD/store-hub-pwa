import React from 'react';
import {
  HomeOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  PlusOutlined,
  EditOutlined,
  CreditCardOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { getItem } from '@/presentation/components/layoutHelpers';
import { Badge } from 'antd';
import { useNotification } from '@/presentation/components/NotificationContext';
import BaseSidebar, { MenuItem } from '@/presentation/components/BaseSidebar';

const NotificationIcon = () => {
  const { unreadNotificationCount } = useNotification();

  return (
    <Badge size="small" count={unreadNotificationCount}>
      <BellOutlined style={{ fontSize: 17, marginInlineEnd: '10px' }} />
    </Badge>
  );
};

// Main menu items
const items: MenuItem[] = [
  getItem('Dashboard', '/vendor/dashboard', <HomeOutlined />),
  getItem('Register', '/vendor/owner/register', <ProfileOutlined />),
  getItem('Register Shop', '/vendor/shop/register', <ProfileOutlined />),
  getItem('New Orders', '/vendor/orders', <ShoppingCartOutlined />),
  getItem('Collected Orders', '/vendor/orders/collected', <ShoppingCartOutlined />),
  getItem('Return Request', '/vendor/orders/return/requested', <ShoppingCartOutlined />),
  getItem('Returned Items', '/vendor/orders/returned', <ShoppingCartOutlined />),
  getItem('Products', '/vendor/products', <AppstoreOutlined />, [
    getItem('Add Product', '/vendor/products/add', <PlusOutlined />),
    getItem('Manage Products', '/vendor/products/manage', <EditOutlined />),
  ]),
  getItem('Payment Overview', '/vendor/transactions', <DollarCircleOutlined />),
  getItem('Reports', '/vendor/reports', <FileTextOutlined />),
  getItem('Notifications', '/vendor/notifications', <NotificationIcon />),
];

// Account section items
const accountMenuItems: MenuItem[] = [
  getItem('Profile', '/vendor/profile', <ProfileOutlined />),
  getItem('Subscription', '/vendor/subscription', <CreditCardOutlined />),
];
const VendorSidebar = ({ collapsed }: { collapsed: boolean }) => (
  <BaseSidebar
    title="Vendor"
    collapsed={collapsed}
    items={items}
    accountMenuItems={accountMenuItems}
  />
);

export default VendorSidebar;
