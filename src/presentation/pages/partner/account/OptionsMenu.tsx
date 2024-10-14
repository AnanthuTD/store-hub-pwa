import { LogoutOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';
import React, { ReactNode } from 'react';

const iconStyle = { color: '#FF5963' };

const CartItem = ({
  label,
  icon,
  key,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  key: React.Key;
}) => (
  <Card
    key={key}
    size="small"
    styles={{
      body: {
        width: '100%',
      },
    }}
    onClick={onClick}
  >
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Space>
        {icon} {label}
      </Space>
      <RightOutlined style={iconStyle} />
    </div>
  </Card>
);

function OptionsMenu({ setSelectedOption }) {
  const options = [
    { label: 'Edit Profile', icon: <UserOutlined style={iconStyle} />, value: 'editProfile' },
    { label: 'Wallet', icon: <UserOutlined style={iconStyle} />, value: 'wallet' },
    { label: 'Logout', icon: <LogoutOutlined style={iconStyle} />, value: 'logout' },
  ];

  return (
    <div>
      <Typography.Title level={4}>Options</Typography.Title>

      <Space direction="vertical" style={{ width: '100%' }}>
        {options.map((option) => (
          <CartItem
            onClick={() => setSelectedOption(option.value)}
            key={option.value}
            label={option.label}
            icon={option.icon}
          />
        ))}
      </Space>
    </div>
  );
}

export default OptionsMenu;
