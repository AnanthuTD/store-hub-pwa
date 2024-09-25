import React from 'react';
import { Button, Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import axiosInstance from '@/config/axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '@/infrastructure/redux/store';
import { logout } from '@/infrastructure/redux/slices/admin/adminSlice';

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
    axiosInstance.get('/admin/auth/logout');
    navigate('/admin/signin');
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
