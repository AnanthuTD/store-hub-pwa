import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { Order, OrderItem } from '../types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import '../styles.css';

dayjs.extend(utc);
dayjs.extend(timezone);

interface OrderOverviewProps {
  data: Order[];
}

const CompletedOrders: React.FC<OrderOverviewProps> = ({ data }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(data);
  }, [data]);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: 'orderId',
    },
    {
      title: 'Status',
      dataIndex: 'storeStatus',
      key: 'storeStatus',
      render: (status: Order['storeStatus']) => {
        const color = status === 'Pending' ? 'orange' : 'green';
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: Order['totalAmount']) => `₹${amount.toFixed(2)} Rs`,
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (orderDate) => dayjs(orderDate).tz('Asia/Kolkata').format('YYYY MMMM DD, hh:mm A'),
    },
  ];

  // Expanded row to show product details and user details
  const expandedRowRender = (record: Order) => {
    const productColumns = [
      {
        title: 'Product ID',
        dataIndex: 'productId',
        key: 'productId',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Variant ID',
        dataIndex: 'variantId',
        key: 'variantId',
      },
      {
        title: 'Store ID',
        dataIndex: 'storeId',
        key: 'storeId',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price: OrderItem['price']) => `₹${price.toFixed(2)} Rs`,
      },
    ];

    const userDetails = (
      <div style={{ marginBottom: '10px' }}>
        <strong>User Details:</strong>
        <div>Email: {record.userDetails.email}</div>
        <div>First Name: {record.userDetails.profile.firstName}</div>
        <div>Last Name: {record.userDetails.profile.lastName}</div>
      </div>
    );

    return (
      <div>
        {userDetails}
        <Table
          columns={productColumns}
          dataSource={record.items.map((item) => ({
            ...item,
            isCancelled: item.isCancelled || false,
          }))}
          pagination={{ pageSize: 5 }} // Added pagination to the expanded table
          rowKey={(item) => item._id}
          style={{ backgroundColor: '#f0f8ff', padding: '10px' }}
          rowClassName={(item) => (item.isCancelled ? 'strikethrough' : '')} // Apply strikethrough class if cancelled
        />
      </div>
    );
  };

  return (
    <div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record.items.length > 0,
        }}
        dataSource={orders} // Use the local state to render the table
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CompletedOrders;
