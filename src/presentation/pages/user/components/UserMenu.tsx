import React from 'react';
import { Dropdown, Button, Space, Menu } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';
import axiosInstance from '@/config/axios';
import { logout } from '@/infrastructure/redux/slices/user/userSlice';
import { Chat } from '@mui/icons-material';

const UserMenu: React.FC = () => {
  const user = useSelector<RootState, RootState['user']['data']>((state) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear Redux store
    navigate('/signin'); // Navigate to sign-in page after logout
    axiosInstance.get('/user/auth/logout');
  };

  const menu = (
    <Menu>
      <Menu.Item key="Profile" icon={<UserOutlined />} disabled>
        <Link to="/profile" target="_blank" rel="noopener noreferrer">
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="Chat" icon={<Chat />}>
        <Link to="/chat" target="_blank" rel="noopener noreferrer">
          Chat
        </Link>
      </Menu.Item>
      <Menu.Item key="Orders" icon={<OrderedListOutlined />}>
        <Link to="/orders" target="_blank" rel="noopener noreferrer">
          Orders
        </Link>
      </Menu.Item>
      <Menu.Item key="Wallet" icon={<WalletOutlined />}>
        <Link to="/wallet" rel="noopener noreferrer">
          Wallet
        </Link>
      </Menu.Item>
      <Menu.Item key="Logout" icon={<LogoutOutlined />}>
        <Button type="default" onClick={handleLogout} style={{ padding: 0, border: 'none' }}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Space direction="vertical">
      <Dropdown overlay={menu} trigger={['hover']} disabled={!user}>
        {user ? (
          <Button>
            <UserOutlined /> {user.profile.firstName}
          </Button>
        ) : (
          <Link to="/signin" style={{ textDecoration: 'none', color: '#23A6F0' }}>
            Login / Register
          </Link>
        )}
      </Dropdown>
    </Space>
  );
};

export default UserMenu;
