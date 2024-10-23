import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  AppstoreOutlined,
  TagOutlined,
  DollarOutlined,
  FileTextOutlined,
  // NotificationOutlined,
  CreditCardOutlined,
  ProfileOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Menu, Layout, Divider, MenuProps, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

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
  getItem('Notifications', '/admin/notifications', <NotificationOutlined />),
  getItem('Orders', '/admin/orders', <CreditCardOutlined />),
  getItem('Subscription Management', '/admin/subscription', <CreditCardOutlined />),
  // getItem('Referrals', '/admin/referrals', <CreditCardOutlined />),
];

// Account section items
const accountMenuItems: MenuItem[] = [getItem('Profile', '/admin/profile', <ProfileOutlined />)];

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname; // Current URL path

  const [activeMenu, setActiveMenu] = useState(pathname);

  // Sync activeMenu state with URL path
  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);

  // Handle menu item clicks
  const handleMenuItemClick = (e: any) => {
    const newPath = e.key; // e.key is the URL path
    setActiveMenu(newPath);
    navigate(newPath); // Navigate to the new URL
  };

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed} width={250}>
      <Typography.Title style={{ paddingLeft: 3 }} level={3}>
        ShopHub Admin
      </Typography.Title>

      {/* Main Menu */}
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]} // Selected key based on the URL
        defaultOpenKeys={[pathname]} // Open the current path by default
        items={items}
        onClick={handleMenuItemClick} // Handle menu clicks
      />

      <Divider>Accounts</Divider>

      {/* Account Menu */}
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]} // Selected key based on the URL
        items={accountMenuItems}
        onClick={handleMenuItemClick} // Handle account menu clicks
      />
    </Sider>
  );
};

export default Sidebar;
