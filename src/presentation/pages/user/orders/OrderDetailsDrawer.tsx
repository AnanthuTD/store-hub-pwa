import React from 'react';
import { Drawer, Spin, Typography, Table, Button, notification, Space } from 'antd';
import { Order } from './types';
import axiosInstance from '@/config/axios';
import DownloadInvoiceButton from './DownloadInvoice';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface OrderDetailsDrawerProps {
  visible: boolean;
  onClose: () => void;
  loading: boolean;
  selectedOrder: Order | null;
}

const isReturnable = (item: any, order: any): boolean => {
  return (
    item.returnStatus === 'Not Requested' &&
    !order.isCancelled &&
    order.storeStatus === 'Collected' &&
    order.deliveryStatus === 'Delivered'
  );
};

const isCancelable = (item: any): boolean => {
  return !item.isCancelled;
};

const isReturned = (item: any): boolean => {
  return item.returnStatus === 'Returned';
};

const isReturnRequested = (item: any): boolean => {
  return item.returnStatus === 'Requested';
};

const isCancelled = (order): boolean => {
  console.log(order);
  return order.isCancelled;
};

const OrderDetailsDrawer: React.FC<OrderDetailsDrawerProps> = ({
  visible,
  onClose,
  loading,
  selectedOrder,
  setSelectedOrder,
}) => {
  const handleReturnRequest = (productId: string, variantId: string) => {
    const { data } = axiosInstance
      .post('/user/return/request', {
        orderId: selectedOrder._id,
        productId: productId,
        variantId: variantId,
      })
      .then(() => {
        console.log(data);

        setSelectedOrder((prev) => ({ ...prev, returnStatus: 'Requested' }));

        notification.success({
          message: 'Return Request Sent',
          description: `Return request for product ID ${productId} has been successfully sent.`,
        });
      })
      .catch(() => {
        notification.error({
          message: 'Failed to send return request',
          description: 'Something went wrong while sending return request. Please try again.',
        });
      });
  };

  const handleCancelRequest = (itemId: string) => {
    const { data } = axiosInstance
      .post('/user/order/cancel-item', {
        orderId: selectedOrder._id,
        itemId,
      })
      .then(() => {
        console.log(data);

        setSelectedOrder((prev) => ({ ...prev, isCancelled: true }));

        notification.success({
          message: 'Cancel Request Sent',
          description: `Cancel request for product has been successfully sent.`,
        });
      })
      .catch(() => {
        notification.error({
          message: 'Failed to cancel item',
          description: 'Something went wrong while cancelling item. Please try again.',
        });
      });
  };

  return (
    <Drawer title="Order Details" placement="right" onClose={onClose} open={visible} width={800}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
          <Paragraph>Loading order details...</Paragraph>
        </div>
      ) : (
        selectedOrder && (
          <>
            <Title level={4}>Order ID: {selectedOrder._id}</Title>
            <Paragraph>
              <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}
            </Paragraph>
            <Paragraph>
              <strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}
            </Paragraph>
            <Paragraph>
              <strong>Payment Status:</strong> {selectedOrder.paymentStatus}
            </Paragraph>
            <Paragraph>
              <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
            </Paragraph>
            <Paragraph>
              <strong>Delivery Partner:</strong> {selectedOrder.deliveryPartnerName}
            </Paragraph>

            <Title level={5}>Items</Title>
            <Table dataSource={selectedOrder.items} rowKey="productId" pagination={false}>
              <Table.Column title="Product" dataIndex="productName" key="productName" />
              <Table.Column title="Store" dataIndex="storeName" key="storeName" />
              <Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
              <Table.Column
                title="Price"
                dataIndex="price"
                key="price"
                render={(text: number) => `₹${text}`}
              />
              <Table.Column title="Status" dataIndex="storeStatus" key="storeStatus" />
              <Table.Column title="Return Status" dataIndex="returnStatus" key="returnStatus" />
              <Table.Column
                title="Action"
                key="action"
                render={(_, item) =>
                  isReturnable(item, selectedOrder) ? (
                    <Button
                      type="primary"
                      onClick={() => handleReturnRequest(item.productId, item.variantId)}
                    >
                      Request Return
                    </Button>
                  ) : isCancelable(item, selectedOrder) ? (
                    <Button type="primary" onClick={() => handleCancelRequest(item._id)}>
                      Cancel
                    </Button>
                  ) : isReturnRequested(item, selectedOrder) ? (
                    <span>Return Requested</span>
                  ) : isReturned(item, selectedOrder) ? (
                    <span>{item.refundMessage} Returned</span>
                  ) : isCancelled(item) ? (
                    <span>Cancelled</span>
                  ) : null
                }
              />
            </Table>
            <Space>
              <Link to={`/orderTracking?orderId=${selectedOrder._id}`}>
                <Button key="track" type="primary">
                  Track your order
                </Button>
              </Link>
              <DownloadInvoiceButton orderId={selectedOrder._id} />
            </Space>
          </>
        )
      )}
    </Drawer>
  );
};

export default OrderDetailsDrawer;
