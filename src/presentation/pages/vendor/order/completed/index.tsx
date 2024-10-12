import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { LoadingOutlined } from '@ant-design/icons';
import CompletedOrders from './CompletedOrders';
import useFetchOrders from '../useFetchOrders';
import OrderFilter from '../Filter';
import { Button, Spin } from 'antd';

const Index = () => {
  const [orderData, setOrderData] = useState([]); // Combined data for socket + API orders
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);
  const [searchId, setSearchId] = useState<string>('');

  // Use your custom hook to fetch existing orders
  const { ordersData, loading } = useFetchOrders({
    limit: 10,
    sortBy: 'orderDate',
    order: 'asc',
    paymentMethod,
    paymentStatus: status,
    searchId,
    dateRange,
    storeStatus: 'Collected',
  });

  // Update order data with fetched orders
  useEffect(() => {
    if (ordersData) {
      setOrderData(ordersData);
    }
  }, [ordersData]);

  // Reset filters
  const handleReset = () => {
    setDateRange(null);
    setStatus(undefined);
    setPaymentMethod(undefined);
    setSearchId('');
  };

  return (
    <>
      <OrderFilter
        dateRange={dateRange}
        status={status}
        paymentMethod={paymentMethod}
        searchId={searchId}
        setDateRange={setDateRange}
        setStatus={setStatus}
        setPaymentMethod={setPaymentMethod}
        setSearchId={setSearchId}
      />
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="default" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      ) : (
        <CompletedOrders data={orderData} />
      )}
    </>
  );
};

export default Index;
