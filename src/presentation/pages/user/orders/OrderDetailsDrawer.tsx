import React from 'react';
import { Drawer, Spin, Typography, Table, Button, notification } from 'antd';
import { Order } from './types';

const { Title, Paragraph } = Typography;

interface OrderDetailsDrawerProps {
  visible: boolean;
  onClose: () => void;
  loading: boolean;
  selectedOrder: Order | null;
}

const OrderDetailsDrawer: React.FC<OrderDetailsDrawerProps> = ({
  visible,
  onClose,
  loading,
  selectedOrder,
}) => {
  const handleReturnRequest = (productId: string) => {
    notification.success({
      message: 'Return Request Sent',
      description: `Return request for product ID ${productId} has been successfully sent.`,
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
                  item.returnStatus === 'Not Requested' && item.storeStatus !== 'Failed' ? (
                    <Button type="primary" onClick={() => handleReturnRequest(item.productId)}>
                      Request Return
                    </Button>
                  ) : null
                }
              />
            </Table>
          </>
        )
      )}
    </Drawer>
  );
};

export default OrderDetailsDrawer;
