import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  PercentageOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  BellOutlined,
  CreditCardOutlined,
  UserOutlined,
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

// Provided Tabs Data with Adjusted Icons
const tabs = [
  { label: 'Dashboard', icon: <HomeOutlined />, key: 'dashboard', href: '/shop/dashboard' },
  { label: 'Register', icon: <ProfileOutlined />, key: 'register', href: '/shop/owner/register' },
  {
    label: 'New Orders',
    icon: <ShoppingCartOutlined />,
    key: 'newOrders',
    href: '/shop/new-orders',
  },
  { label: 'Products', icon: <AppstoreOutlined />, key: 'products', href: '/shop/products' },
  { label: 'Offers', icon: <PercentageOutlined />, key: 'offers', href: '/shop/offers' },
  {
    label: 'Payment Overview',
    icon: <DollarCircleOutlined />,
    key: 'paymentOverview',
    href: '/shop/payment-overview',
  },
  { label: 'Reports', icon: <FileTextOutlined />, key: 'reports', href: '/shop/reports' },
  {
    label: 'Notifications',
    icon: <BellOutlined />,
    key: 'notification',
    href: '/shop/notifications',
  },
  {
    label: 'Profile',
    icon: <UserOutlined />,
    key: 'profile',
    href: '/shop/profile',
    section: 'accounts',
  },
  {
    label: 'Subscription',
    icon: <CreditCardOutlined />,
    key: 'subscription',
    href: '/shop/subscription',
    section: 'accounts',
  },
];

// Main menu items (not in accounts section)
const items: MenuItem[] = tabs
  .filter((tab) => !tab.section)
  .map((tab) => getItem(tab.label, tab.href, tab.icon));

// Account section items
const accountMenuItems: MenuItem[] = tabs
  .filter((tab) => tab.section === 'accounts')
  .map((tab) => getItem(tab.label, tab.href, tab.icon));

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const [activeMenu, setMenu] = useState(pathname); // Default the active key to the current path

  useEffect(() => {
    const routeMapping = {};
    if (activeMenu && routeMapping[activeMenu]) {
      navigate(routeMapping[activeMenu]);
    }
  }, [activeMenu, navigate]);

  const getSelectedKey = () => {
    if (pathname.startsWith('/shop/partner')) return '/shop/partner';
    return '/shop/dashboard'; // Default selected key
  };

  const handleMenuItemClick = (e: any) => {
    setMenu(e.key); // Set the active menu to the clicked key
    navigate(e.key); // Navigate to the clicked menu item
  };

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
      <Typography.Title style={{ paddingLeft: 3 }} level={3}>
        ShopHub Vendor
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
