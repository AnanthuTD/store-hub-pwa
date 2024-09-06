import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const AppHeader: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        backgroundColor: 'white',
        boxShadow: '0px 0.5px 50px 5px #0000000d',
        borderRadius: '0px 0px 20px 20px',
        zIndex: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <img src="/Bag.svg" />
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Poppins-SemiBold', color: '#2b2e35', fontWeight: 'bold' }}
          fontWeight={'bold'}
          fontSize={24}
        >
          Orders
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
