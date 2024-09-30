import React from 'react';
import { Table, Button } from 'antd';
import { Order } from './types';

interface OrderTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onViewDetails }) => {
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
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
      title: 'Action',
      key: 'action',
      render: (text: any, record: Order) => (
        <Button onClick={() => onViewDetails(record)}>View Details</Button>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={orders} rowKey="orderId" pagination={{ pageSize: 5 }} />
  );
};

export default OrderTable;
