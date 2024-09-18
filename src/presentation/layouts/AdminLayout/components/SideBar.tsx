import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  AppstoreOutlined,
  TagOutlined,
  DollarOutlined,
  FileTextOutlined,
  NotificationOutlined,
  CreditCardOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Menu, Layout, Divider, MenuProps, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '/admin/dashboard', <HomeOutlined />),
  getItem('Verification', '/admin/verification', <UserOutlined />, [
    getItem('Partner', '/admin/partner', <UserOutlined />, [
      getItem('Verified Partner', '/admin/partner/list/verified', <UserOutlined />),
      getItem('Pending Partner', '/admin/partner/list/pending', <UserOutlined />),
      getItem('Rejected Partner', '/admin/partner/list/rejected', <UserOutlined />),
    ]),
    getItem('Vendor', '/admin/vendor', <UserOutlined />, [
      getItem('Verified Partner', '/admin/vendor/verification/verified', <UserOutlined />),
      getItem('Pending Partner', '/admin/vendor/verification/pending', <UserOutlined />),
      getItem('Rejected Partner', '/admin/vendor/verification/rejected', <UserOutlined />),
    ]),
  ]),
  getItem('User', '/admin/user', <UserOutlined />),
  getItem('Shops', '/admin/vendors', <ShopOutlined />),
  getItem('Products', '/admin/products', <AppstoreOutlined />),
  getItem('Offers', '/admin/offers', <TagOutlined />),
  getItem('Coupons', '/admin/coupons', <TagOutlined />),
  getItem('Category', '/admin/category', <AppstoreOutlined />, [
    getItem('Add', '/admin/category/add', <UserOutlined />),
    getItem('View', '/admin/category/view', <UserOutlined />),
  ]),
  getItem('Payment Overview', '/admin/payment-overview', <DollarOutlined />),
  getItem('Reports', '/admin/reports', <FileTextOutlined />),
  getItem('Notifications', '/admin/notifications', <NotificationOutlined />),
  getItem('Delivery', '/admin/delivery', <CreditCardOutlined />),
  getItem('Referrals', '/admin/referrals', <CreditCardOutlined />),
];

// Account section items
const accountMenuItems: ItemType<MenuItemType>[] = [
  getItem('Profile', '/admin/profile', <ProfileOutlined />),
];

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const [activeMenu, setMenu] = useState(pathname); // Default the active key to the current path

  useEffect(() => {
    const routeMapping = {
      '/admin/dashboard': '/admin/dashboard',
      '/admin/partner/list/verified': '/admin/partner/list/verified',
      '/admin/partner/list/pending': '/admin/partner/list/pending',
      '/admin/partner/list/rejected': '/admin/partner/list/rejected',
      '/admin/vendor/verification/verified': '/admin/vendor/verification/verified',
      '/admin/vendor/verification/pending': '/admin/vendor/verification/pending',
      '/admin/vendor/verification/rejected': '/admin/vendor/verification/rejected',
      '/admin/user': '/admin/user',
      '/admin/vendors': '/admin/vendors',
      '/admin/products': '/admin/products',
      '/admin/offers': '/admin/offers',
      '/admin/coupons': '/admin/coupons',
      '/admin/category/add': '/admin/category/add',
      '/admin/category/view': '/admin/category/view',
      '/admin/payment-overview': '/admin/payment-overview',
      '/admin/reports': '/admin/reports',
      '/admin/notifications': '/admin/notifications',
      '/admin/delivery': '/admin/delivery',
      '/admin/referrals': '/admin/referrals',
      '/admin/profile': '/admin/profile',
    };
    if (activeMenu && routeMapping[activeMenu]) {
      navigate(routeMapping[activeMenu]);
    }
  }, [activeMenu, navigate]);

  const getSelectedKey = () => {
    if (pathname.startsWith('/admin/partner')) return '/admin/partner';
    if (pathname.startsWith('/admin/user')) return '/admin/user';
    if (pathname.startsWith('/admin/vendors')) return '/admin/vendors';
    if (pathname.startsWith('/admin/products')) return '/admin/products';
    if (pathname.startsWith('/admin/offers')) return '/admin/offers';
    if (pathname.startsWith('/admin/coupons')) return '/admin/coupons';
    if (pathname.startsWith('/admin/category')) return '/admin/category';
    if (pathname.startsWith('/admin/payment-overview')) return '/admin/payment-overview';
    if (pathname.startsWith('/admin/reports')) return '/admin/reports';
    if (pathname.startsWith('/admin/notifications')) return '/admin/notifications';
    if (pathname.startsWith('/admin/delivery')) return '/admin/delivery';
    if (pathname.startsWith('/admin/referrals')) return '/admin/referrals';
    return '/admin/dashboard'; // Default selected key
  };

  const handleMenuItemClick = (e) => {
    setMenu(e.key); // Set the active menu to the clicked key
  };

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
      <Typography.Title style={{ paddingLeft: 3 }} level={3}>
        ShopHub Admin
      </Typography.Title>
      {/* Main Menu */}
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]} // Ensure only one key is selected at a time
        defaultOpenKeys={[getSelectedKey()]} // Open based on the current path
        items={items}
        onClick={handleMenuItemClick} // Handle menu clicks
      />
      <Divider>Accounts</Divider>
      {/* Account Menu */}
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]} // Ensure only one key is selected at a time
        items={accountMenuItems}
        onClick={handleMenuItemClick}
      />
    </Sider>
  );
};

export default Sidebar;
