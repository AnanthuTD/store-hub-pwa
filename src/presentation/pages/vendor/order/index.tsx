import { useEffect, useState } from 'react';
import { RootState } from '@/infrastructure/redux/store';
import { useSelector } from 'react-redux';
import { notification, Button, Spin } from 'antd';
import OrderOverview from './OrderOverview';
import useFetchOrders from './useFetchOrders'; // Import your hook
import OrderFilter from './Filter';
import { Dayjs } from 'dayjs';
import { LoadingOutlined } from '@ant-design/icons';
import { socket, StoreSocketEvents } from '@/infrastructure/socket/storeSocket';

const Index = () => {
  const store = useSelector((state: RootState) => state.vendor.selectedStore);
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
  });

  // Handle live socket data (real-time updates)
  useEffect(() => {
    if (!store) return;

    // Join the store room
    socket.emit('joinStoreRoom', store._id);

    // Listen for new orders from the socket
    socket.on(StoreSocketEvents.StoreNewOrder, (data) => {
      notification.success({
        message: 'New Order Received',
        description: `Order #${data.orderId} has been placed.`,
        placement: 'bottomRight',
      });
      // Prevent duplicate orders
      setOrderData((prev) => {
        const existingOrderIds = new Set(prev.map((order) => order._id));
        return existingOrderIds.has(data._id) ? prev : [data, ...prev];
      });
    });

    return () => {
      socket.off('newOrder');
    };
  }, [store]);

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
        <OrderOverview data={orderData} />
      )}
    </>
  );
};

export default Index;
