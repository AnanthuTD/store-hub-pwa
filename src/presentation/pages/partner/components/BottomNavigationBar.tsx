import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import BagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const BottomNavigationBar: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
        boxShadow: '0px -2px 15px #00000020',
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: '10px 20px',
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          backgroundColor: 'white',
          '& .Mui-selected': {
            color: '#ffff',
          },
        }}
      >
        <BottomNavigationAction
          label="Orders"
          icon={<BagIcon />}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#ff5963',
              borderRadius: '5px',
              color: 'white',
              padding: '0 12px',
            },
            width: '164px',
            height: '48px',
            color: 'black',
          }}
        />
        <BottomNavigationAction
          label="Account"
          icon={<AccountCircleIcon />}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#ff5963',
              borderRadius: '5px',
              color: 'white',
              padding: '0 12px',
            },
            width: '164px',
            height: '48px',
            color: 'black',
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
