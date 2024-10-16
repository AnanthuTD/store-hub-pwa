import React, { useEffect, useState } from 'react';
import { Table, Button, Spin, message } from 'antd';
import axiosInstance from '@/config/axios';
import DeliveryDetailsModal from './DeliveryDetailsModal';

interface IOrder {
  orderId: string;
  orderDate: string;
  deliveryStatus: string;
  deliveryPartnerName: string | null;
  deliveryFee: number;
}

const OrdersList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/admin/orders');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        message.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const showModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedOrderId(null);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Delivery Status',
      dataIndex: 'deliveryStatus',
      key: 'deliveryStatus',
    },
    /*  {
      title: 'Delivery Partner',
      dataIndex: 'deliveryPartnerName',
      key: 'deliveryPartnerName',
      render: (name: string | null) => name || 'Not Assigned',
    }, */
    {
      title: 'Delivery Fee',
      dataIndex: 'deliveryFee',
      key: 'deliveryFee',
      render: (fee: number) => `${fee} Rs`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: IOrder) => (
        <Button type="primary" onClick={() => showModal(record._id)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Spin tip="Loading orders..." />
      ) : (
        <Table columns={columns} dataSource={orders} rowKey="_id" />
      )}

      {/* Delivery Details Modal */}
      {selectedOrderId && (
        <DeliveryDetailsModal
          orderId={selectedOrderId}
          isVisible={isModalVisible}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default OrdersList;
