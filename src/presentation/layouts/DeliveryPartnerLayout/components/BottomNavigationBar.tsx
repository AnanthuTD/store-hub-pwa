import React, { useEffect, useState } from 'react';
import { Tabs, theme, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const BottomNavigationBar: React.FC = () => {
  const [activeKey, setActiveKey] = useState('1');
  const navigate = useNavigate();

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: '1',
      label: (
        <Button
          size="large"
          style={{
            color: activeKey === '1' ? 'white' : 'black',
            backgroundColor: activeKey === '1' ? '#ff5963' : 'white',
          }}
        >
          Orders
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button
          size="large"
          style={{
            color: activeKey === '2' ? 'white' : 'black',
            backgroundColor: activeKey === '2' ? '#ff5963' : 'white',
          }}
        >
          Account
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // TODO: Uncomment
    /*  if (activeKey === '1') {
      navigate('/partner/order');
    } else if (activeKey === '2') {
      navigate('/partner/account');
      } */
    navigate('/partner/account');
  }, [activeKey]);

  return (
    <>
      <Tabs
        activeKey={activeKey}
        onChange={handleTabChange}
        centered
        items={items}
        tabBarStyle={{
          background: colorBgContainer,
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
        }}
      />
    </>
  );
};

export default BottomNavigationBar;
