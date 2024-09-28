import React from 'react';
import { Button, Layout, Row, Space, theme, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import axiosInstance from '@/config/axios';
import { logout } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';

const { Header } = Layout;

interface HeaderBarProps {
  collapsed: boolean;
  toggle: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ collapsed, toggle }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const store = useSelector((state: RootState) => state.vendor.selectedStore);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    axiosInstance.get('/vendor/auth/logout');
    navigate('/vendor/signin');
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
      <Row>
        {store ? (
          <Space.Compact size={'small'} direction="vertical">
            <Typography.Title level={5} style={{ margin: 0, color: '#4B4B4B' }}>
              {store.name}
            </Typography.Title>
            <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
              ID: #<strong>{store._id}</strong>
            </Typography.Text>
          </Space.Compact>
        ) : null}
        <Button onClick={handleLogout} style={{ marginInline: 16 }} danger>
          Logout
        </Button>
      </Row>
    </Header>
  );
};

export default HeaderBar;
