import React from 'react';
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
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Menu, Layout, Divider, Typography, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

// Helper function to generate menu items
const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem =>
  ({
    key,
    icon,
    children,
    label,
  }) as MenuItem;

// Tabs Data with Adjusted Icons
const mainMenuItems = [
  getItem('Dashboard', '/shop/dashboard', <HomeOutlined />),
  getItem('Register', '/shop/owner/register', <ProfileOutlined />),
  getItem('New Orders', '/shop/new-orders', <ShoppingCartOutlined />),
  getItem('Products', '/shop/products', <AppstoreOutlined />, [
    getItem('Add Product', '/vendor/products/add', <PlusOutlined />),
    getItem('Edit Product', '/shop/products/edit', <EditOutlined />),
  ]),
  getItem('Offers', '/shop/offers', <PercentageOutlined />),
  getItem('Payment Overview', '/shop/payment-overview', <DollarCircleOutlined />),
  getItem('Reports', '/shop/reports', <FileTextOutlined />),
  getItem('Notifications', '/shop/notifications', <BellOutlined />),
  getItem('Subscription', '/shop/subscription', <CreditCardOutlined />, undefined, 'accounts'),
];

// Account section items
const accountMenuItems: ItemType<MenuItemType>[] = [
  getItem('Profile', '/shop/profile', <UserOutlined />),
  getItem('Subscription', '/shop/subscription', <CreditCardOutlined />),
];

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Default selected key based on pathname
  const getSelectedKey = () => {
    const matchingTab = mainMenuItems.find((tab) => pathname.startsWith(tab.key));
    return matchingTab?.key || '/shop/dashboard';
  };

  // Handle menu item click
  const handleMenuItemClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
      <Typography.Title style={{ paddingLeft: 3 }} level={3}>
        ShopHub Vendor
      </Typography.Title>
      {/* Main Menu */}
      <Menu
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        defaultOpenKeys={[getSelectedKey()]}
        items={mainMenuItems}
        onClick={handleMenuItemClick}
      />
      <Divider>Accounts</Divider>
      {/* Account Menu */}
      <Menu
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        items={accountMenuItems}
        onClick={handleMenuItemClick}
      />
    </Sider>
  );
};

export default Sidebar;
