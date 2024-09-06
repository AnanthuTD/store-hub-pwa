import React from 'react';
import BottomNavigationBar from '../components/BottomNavigationBar';
import { Box, Typography } from '@mui/material';
import Wrapper from '../components/Wrapper';
import AppHeader from '../components/AppHeader';
import DateSelector from '../components/DateSelector';
import Illustration from '../components/Illustration';
import Card from './components/Card';

const orders = [
  { id: '#11250', status: 'Ongoing', color: '#00bfff' },
  { id: '#11251', status: 'Pickup Failed', color: '#ff6f61' },
  { id: '#11252', status: 'Delivered', color: '#32cd32' },
  { id: '#11251', status: 'Delivery Failed', color: '#ff6f61' },
  { id: '#11253', status: 'Delivered', color: '#32cd32' },
  { id: '#11250', status: 'Delivered', color: '#32cd32' },
  { id: '#11252', status: 'Delivered', color: '#32cd32' },
];

const Store: React.FC = () => {
  return (
    <Wrapper>
      <AppHeader />
      <DateSelector />
      <Box>
        {orders.length ? (
          <Card orders={orders} />
        ) : (
          <>
            <Illustration />
            <Typography
              variant="h6"
              sx={{
                position: 'fixed',
                top: 520,
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'Radio_Canada-Regular',
                color: '#2b2e35',
                textAlign: 'center',
              }}
            >
              No New Orders
            </Typography>
          </>
        )}
      </Box>
      <BottomNavigationBar />
    </Wrapper>
  );
};

export default Store;
