import React from 'react';
import { Button, Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import axiosInstance from '@/config/axios';
import { logout } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '@/infrastructure/redux/store';

const { Header } = Layout;

interface HeaderBarProps {
  collapsed: boolean;
  toggle: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ collapsed, toggle }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/vendor/signin');
    axiosInstance.get('/vendor/auth/logout');
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggle}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />

      <Button onClick={handleLogout} style={{ marginInline: 16 }} danger>
        Logout
      </Button>
    </Header>
  );
};

export default HeaderBar;
