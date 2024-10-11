import React from 'react';
import { Table, Tag } from 'antd';
import { Order, OrderItem } from './types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface OrderOverviewProps {
  data: Order[];
}

const OrderOverview: React.FC<OrderOverviewProps> = ({ data }) => {
  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: 'orderId',
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: Order['paymentStatus']) => {
        const color = status === 'Pending' ? 'orange' : 'green';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: Order['totalAmount']) => `$${amount.toFixed(2)} Rs`,
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

  // Expanding row to show product details
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
        render: (price: OrderItem['price']) => `$${price.toFixed(2)} Rs`,
      },
    ];

    return (
      <Table
        columns={productColumns}
        dataSource={record.items}
        pagination={false}
        rowKey={(item) => item._id}
        style={{ backgroundColor: '#f0f8ff', padding: '10px' }}
      />
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
        dataSource={data}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default OrderOverview;
