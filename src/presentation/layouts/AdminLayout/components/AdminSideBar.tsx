import React from 'react';
import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  AppstoreOutlined,
  TagOutlined,
  DollarOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  ProfileOutlined,
  WechatWorkOutlined,
  BellOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { getItem } from '@/presentation/components/layoutHelpers';
import { Badge } from 'antd';
import useUserProfile from '@/hooks/useUserProfile';
import useChat from '@/hooks/fetchUnreadChatsStatus';
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

const ChatIcon = () => {
  const admin = useUserProfile('admin');
  const { hasUnreadChats } = useChat('admin', admin?.id);

  return (
    <Badge dot={hasUnreadChats} size="default">
      <WechatWorkOutlined style={{ fontSize: 17, marginInlineEnd: '10px' }} />
    </Badge>
  );
};
const items: MenuItem[] = [
  getItem('Dashboard', '/admin/dashboard', <HomeOutlined />),
  getItem('Verification', '/admin/verification', <UserOutlined />, [
    getItem('Partner', '/admin/partner', <UserOutlined />, [
      getItem('Verified Partners', '/admin/partner/list/verified', <UserOutlined />),
      getItem('Unverified Partners', '/admin/partner/list/unverified', <UserOutlined />),
    ]),
    getItem('Vendor', '/admin/vendor', <UserOutlined />, [
      getItem('Verified Vendors', '/admin/vendor/verification/verified', <UserOutlined />),
      getItem('Unverified Vendors', '/admin/vendor/verification/unverified', <UserOutlined />),
    ]),
  ]),
  getItem('User', '/admin/users', <UserOutlined />),
  getItem('Shops', '/admin/stores', <ShopOutlined />),
  getItem('Products', '/admin/products', <AppstoreOutlined />),
  // getItem('Offers', '/admin/offers', <TagOutlined />),
  getItem('Coupons', '/admin/coupons', <TagOutlined />, [
    getItem('Add', '/admin/coupons/add', <TagOutlined />),
    getItem('View', '/admin/coupons/view', <TagOutlined />),
  ]),
  getItem('Category', '/admin/category', <AppstoreOutlined />, [
    getItem('Add', '/admin/category/add', <UserOutlined />),
    getItem('View', '/admin/category/view', <UserOutlined />),
  ]),
  getItem('Payment Overview', '/admin/payment-overview', <DollarOutlined />),
  getItem('Reports', '/admin/reports', <FileTextOutlined />),
  getItem('Notifications ', '/admin/notifications', <NotificationIcon />),
  getItem('Orders', '/admin/orders', <CreditCardOutlined />),
  getItem('Subscription Management', '/admin/subscription', <CreditCardOutlined />),
  getItem('Notifications', '/admin/notifications', <NotificationOutlined />),
  getItem('Chats', '/admin/chat', <ChatIcon />),
];

const accountMenuItems = [getItem('Profile', '/admin/profile', <ProfileOutlined />)];

const AdminSidebar = ({ collapsed }: { collapsed: boolean }) => (
  <BaseSidebar
    title="ShopHub Admin"
    collapsed={collapsed}
    items={items}
    accountMenuItems={accountMenuItems}
  />
);

export default AdminSidebar;
