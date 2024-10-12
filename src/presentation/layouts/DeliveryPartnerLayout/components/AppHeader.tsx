import React from 'react';
import { Typography } from 'antd';

const AppHeader: React.FC = () => {
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
      <img src="/Bag.svg" alt="logo" style={{ marginRight: 10 }} />
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
        Orders
      </Typography.Title>
    </div>
  );
};

export default AppHeader;
