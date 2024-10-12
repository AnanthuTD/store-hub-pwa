import React, { useEffect, useState } from 'react';
import DateSelector from '../components/DateSelector';
import Illustration from '../components/Illustration';
import Card from './components/Card';
import { Typography } from 'antd';
import axiosInstance from '@/config/axios';
import dayjs from 'dayjs';

interface IOrders {
  _id: string;
}
[];

async function fetchOrders(date): Promise<IOrders> {
  try {
    const { data } = await axiosInstance.get('/partner/orders', { params: { date } });
    return data.orders;
  } catch {
    return [];
  }
}

const Store: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    fetchOrders(date).then((orders) => setOrders(orders));
  }, [date]);

  return (
    <>
      <DateSelector setDate={setDate} />
      <div>
        {orders.length ? (
          <Card orders={orders} />
        ) : (
          <>
            <Illustration />
            <Typography.Title
              level={5}
              style={{
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
            </Typography.Title>
          </>
        )}
      </div>
    </>
  );
};

export default Store;
