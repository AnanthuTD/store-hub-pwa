import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography, Divider, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

export type MenuItem = Required<MenuProps>['items'][number];

type BaseSidebarProps = {
  title: string;
  collapsed: boolean;
  items: MenuItem[];
  accountMenuItems: MenuItem[];
};

const BaseSidebar: React.FC<BaseSidebarProps> = ({ title, collapsed, items, accountMenuItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  const handleMenuItemClick = (e: { key: string }) => {
    setActiveMenu(e.key);
    navigate(e.key);
  };

  return (
    <Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      style={{ height: '100vh' }}
    >
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Typography.Title style={{ paddingLeft: 3 }} level={3}>
          {title}
        </Typography.Title>
        <div style={{ overflowY: 'auto', paddingBottom: '5rem' }} className="hidden-scrollbar">
          <Menu
            mode="inline"
            selectedKeys={[activeMenu]}
            items={items}
            onClick={handleMenuItemClick}
          />
          <Divider>Accounts</Divider>
          <Menu
            mode="inline"
            selectedKeys={[activeMenu]}
            items={accountMenuItems}
            onClick={handleMenuItemClick}
          />
        </div>
      </div>
    </Sider>
  );
};

export default BaseSidebar;
