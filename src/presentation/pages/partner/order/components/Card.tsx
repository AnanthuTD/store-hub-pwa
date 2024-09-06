import { Box } from '@mui/material';
import React from 'react';
import OrderCard from './OrderCard';

export interface Order {
  id: string;
  color: string;
  status: string;
}

function Card({ orders }: { orders: Order[] }) {
  return (
    <Box sx={{ marginTop: 15, paddingX: 2 }} display={'flex'} flexDirection={'column'} gap={2}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Box>
  );
}

export default Card;
