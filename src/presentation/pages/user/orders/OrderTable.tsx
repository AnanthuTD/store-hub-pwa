import React from 'react';
import { Table, Button } from 'antd';
import { Order } from './types';

interface OrderTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  totalOrders: number;
  setPage: (page: number) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onViewDetails, totalOrders, setPage }) => {
  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: 'orderId',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text: number) => `₹${text}`,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: Order) => (
        <Button onClick={() => onViewDetails(record)}>View Details</Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={orders}
      rowKey="orderId"
      pagination={{
        pageSize: 10,
        onChange: (page) => {
          setPage(page);
        },
        total: totalOrders,
      }}
    />
  );
};

export default OrderTable;
