import React, { useState } from 'react';
import { Typography } from 'antd';
import { Order } from './types';
import { orderData } from './sampleData';
import SearchBar from './SearchBar';
import DateRangePicker from './DateRangePicker';
import PaymentStatusSelect from './PaymentStatusSelect';
import OrderTable from './OrderTable';
import OrderDetailsDrawer from './OrderDetailsDrawer';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { Title } = Typography;

const OrderListing: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState(orderData);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>([null, null]);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

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

  const handleSearch = (value: string) => {
    setSearchText(value);
    filterOrders(value, dateRange, paymentStatus);
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setDateRange(dates);
    filterOrders(searchText, dates, paymentStatus);
  };

  const handlePaymentStatusChange = (value: string) => {
    setPaymentStatus(value);
    filterOrders(searchText, dateRange, value);
  };

  const filterOrders = (
    search: string,
    dateRange: [Dayjs | null, Dayjs | null] | null,
    status: string | null,
  ) => {
    const filtered = orderData.filter((order) => {
      const matchesSearch = order.orderId.toLowerCase().includes(search.toLowerCase());

      const matchesDate = dateRange
        ? (!dateRange[0] || dayjs(order.orderDate).isSameOrAfter(dateRange[0].startOf('day'))) &&
          (!dateRange[1] || dayjs(order.orderDate).isSameOrBefore(dateRange[1].endOf('day')))
        : true;

      const matchesStatus = !status || order.paymentStatus === status;

      return matchesSearch && matchesDate && matchesStatus;
    });

    setFilteredOrders(filtered);
  };

  return (
    <div>
      <Title level={2}>Order Listings</Title>
      <SearchBar onSearch={handleSearch} />
      <DateRangePicker onChange={handleDateChange} />
      <PaymentStatusSelect onChange={handlePaymentStatusChange} />
      <OrderTable orders={filteredOrders} onViewDetails={showDrawer} />
      <OrderDetailsDrawer
        visible={visible}
        onClose={onClose}
        loading={loading}
        selectedOrder={selectedOrder}
      />
    </div>
  );
};

export default OrderListing;
