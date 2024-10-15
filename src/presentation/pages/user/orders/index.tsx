import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { Order } from './types';
import { orderData } from './sampleData';
// import SearchBar from './SearchBar';
import DateRangePicker from './DateRangePicker';
import PaymentStatusSelect from './PaymentStatusSelect';
import OrderTable from './OrderTable';
import OrderDetailsDrawer from './OrderDetailsDrawer';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import axiosInstance from '@/config/axios';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { Title } = Typography;

const OrderListing: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState(orderData);
  // const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>([null, null]);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    axiosInstance
      .get('/user/order', {
        params: {
          // search: searchText,
          paymentStatus,
          startDate: dateRange?.[0],
          endDate: dateRange?.[1],
          page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        const {
          orders,
          pagination: { totalOrders },
        } = data;

        setTotalOrders(totalOrders);
        setFilteredOrders(orders);
      });
  }, [/* searchText, */ dateRange, paymentStatus, page]);

  const showDrawer = (order: Order) => {
    setLoading(true);
    setVisible(true);
    setTimeout(() => {
      setSelectedOrder(order);
      setLoading(false);
    }, 1000);
  };

  const onClose = () => {
    setVisible(false);
    setSelectedOrder(null);
  };

  /*  const handleSearch = (value: string) => {
    setSearchText(value);
  }; */

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setDateRange(dates);
  };

  const handlePaymentStatusChange = (value: string) => {
    setPaymentStatus(value);
  };

  return (
    <div>
      <Title level={2}>Order Listings - {totalOrders}</Title>
      {/* <SearchBar onSearch={handleSearch} /> */}
      <DateRangePicker onChange={handleDateChange} />
      <PaymentStatusSelect onChange={handlePaymentStatusChange} />
      <OrderTable
        orders={filteredOrders}
        onViewDetails={showDrawer}
        totalOrders={totalOrders}
        setPage={setPage}
      />
      <OrderDetailsDrawer
        visible={visible}
        onClose={onClose}
        loading={loading}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
    </div>
  );
};

export default OrderListing;
