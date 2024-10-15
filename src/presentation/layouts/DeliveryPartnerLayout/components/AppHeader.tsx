import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';

const AppHeader: React.FC = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  const [icon, setIcon] = useState(<></>);

  useEffect(() => {
    const { pathname } = location;

    if (pathname.includes('/account')) {
      setPageTitle('Account');
      setIcon(<img src="/User.svg" alt="logo" style={{ marginRight: 10 }} />);
    } else if (pathname.includes('/order')) {
      setPageTitle('Orders');
      setIcon(<img src="/Bag.svg" alt="logo" style={{ marginRight: 10 }} />);
    }
  }, [location]);

  return (
    <div
      style={{
        backgroundColor: 'white',
        boxShadow: '0px 0.5px 50px 5px rgba(0, 0, 0, 0.05)',
        borderRadius: '0px 0px 20px 20px',
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {icon}
      <Typography.Title
        level={3}
        style={{
          margin: 0,
          fontFamily: 'Poppins-SemiBold',
          color: '#2b2e35',
          fontWeight: 'bold',
          fontSize: 24,
        }}
      >
        {pageTitle}
      </Typography.Title>
    </div>
  );
};

export default AppHeader;
