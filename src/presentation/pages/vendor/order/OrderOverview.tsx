import React from 'react';
import { Table, Tag } from 'antd';
import { Order, OrderItem } from './types';

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
      title: 'Status',
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
      render: (amount: Order['totalAmount']) => `$${amount.toFixed(2)} USD`,
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
        render: (price: OrderItem['price']) => `$${price.toFixed(2)} USD`,
      },
    ];

    return (
      <Table
        columns={productColumns}
        dataSource={record.items}
        pagination={false}
        rowKey="productId"
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
        rowKey="orderId"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default OrderOverview;
