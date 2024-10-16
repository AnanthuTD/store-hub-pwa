import React, { useEffect, useState } from 'react';
import { Alert, Button, InputNumber, Modal, Table, Tag, Typography, message } from 'antd';
import { Order, OrderItem } from './types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import axiosInstance from '@/config/axios';
import './styles.css';
import axios from 'axios';

dayjs.extend(utc);
dayjs.extend(timezone);

interface OrderOverviewProps {
  data: Order[];
}

const OrderOverview: React.FC<OrderOverviewProps> = ({ data }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [otp, setOtp] = useState<number | null>(null);
  const [otpMessage, setOtpMessage] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setOrders(data);
  }, [data]);

  // Function to update the order status
  const updateStatus = async (order) => {
    if (!selectedOrder && !order) {
      message.error('No order selected');
      return;
    }

    console.log(order);

    const { _id: orderId, storeStatus } = order || selectedOrder;

    if (storeStatus === 'ReadyForPickup' && !otp) {
      message.warning('Please enter OTP');
      setOpenModal(true);
      return;
    }

    setOpenModal(false);

    try {
      const response = await axiosInstance.patch(`/vendor/orders/store-status`, { orderId, otp });
      const updatedStatus = response.data.storeStatus;

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, storeStatus: updatedStatus } : order,
        ),
      );
      message.success('Order status updated successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (storeStatus === 'ReadyForPickup') {
          setOtpMessage('Please enter a valid OTP');
          setOpenModal(true);
          setOtp(null);
          return;
        }

        message.error(error.response?.data.message);
      } else {
        message.error('Error while updating status');
      }
    }
  };

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
      render: (status: Order['storeStatus'], record: Order) => {
        const color = status === 'Pending' ? 'orange' : 'green';
        return (
          <Tag
            onClick={() => {
              setSelectedOrder(record);
              updateStatus(record);
            }}
            color={color}
            style={{ cursor: 'pointer' }}
          >
            {status?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'storeAmount',
      key: 'totalAmount',
      render: (amount: Order['storeAmount']) => `₹${amount.toFixed(2)} Rs`,
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

    const userDetails = record.userDetails ? (
      <div style={{ marginBottom: '10px' }}>
        <strong>User Details:</strong>
        <div>Email: {record.userDetails?.email}</div>
        <div>First Name: {record.userDetails?.profile?.firstName}</div>
        <div>Last Name: {record.userDetails?.profile?.lastName}</div>
      </div>
    ) : null;

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

      <Modal
        open={openModal}
        footer={[
          <Button key="submit" type="primary" onClick={updateStatus}>
            Verify
          </Button>,
        ]}
        closable={true}
        onClose={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <Typography.Text>
          please call and verify the user before delivering the product +91xxxxxxxxxx
        </Typography.Text>

        <InputNumber onChange={(value) => setOtp(value)} />

        {otpMessage ? <Alert banner closable={false} message={otpMessage} /> : null}
      </Modal>
    </div>
  );
};

export default OrderOverview;
