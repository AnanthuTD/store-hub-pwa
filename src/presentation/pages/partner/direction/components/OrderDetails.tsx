import { Button, Card, Drawer, Row, Typography, Modal, Tooltip, Col, Divider, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Order } from '../types';
import _ from 'lodash';
import axiosInstance from '@/config/axios';
import { dummyDistance, dummyDuration, dummyOrder } from './sampleOrderData';
import { useNavigate } from 'react-router-dom';

function OrderDetails({
  distance = dummyDistance,
  duration = dummyDuration,
  setDirection,
}: {
  distance: number;
  duration: number;
}) {
  const [orderDetails, setOrderDetails] = useState<Order | null>(dummyOrder);
  const [storeArrived, setStoreArrived] = useState(false);
  const [userReached, setUserReached] = useState(false);
  const [collected, setCollected] = useState(false);
  const [open, setOpen] = useState(true);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('orderDetailsAndDirection');
    if (data) {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      setOrderDetails(parsedData?.order || null);
      setUserPhone(parsedData?.order?.userPhone || null); // Get user phone from order data
    }
  }, []);

  const totalAmount = useMemo(() => orderDetails?.totalAmount, [orderDetails]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onReachedStore = useCallback(
    _.debounce(() => {
      console.log('Reached Store');
      setStoreArrived(true);
      Modal.success({
        title: 'Reached the Store',
        content: 'Please verify the products before collecting the order.',
      });

      axiosInstance.post('/partner/delivery/store-reached', { orderId: orderDetails?._id });
    }, 500),
    [orderDetails],
  );

  const onReachedUser = useCallback(
    _.debounce(() => {
      console.log('User Reached');
      setUserReached(true);
      Modal.success({
        title: 'You have reached the destination',
        content: 'Please verify the products with the user.',
        onOk: () => {
          // Ask if the partner needs to call the user
          if (userPhone) {
            Modal.confirm({
              title: 'User Not Found?',
              content: `If you cannot find the user, you can call them at ${userPhone}.`,
              okText: 'Call User',
              cancelText: 'Cancel',
              onOk: () => {
                // Implement functionality to call the user (can be a link to a dialer)
                window.open(`tel:${userPhone}`);
              },
            });
          }
        },
      });

      axiosInstance.post('/partner/delivery/user-reached', { orderId: orderDetails?._id });
    }, 500),
    [orderDetails, userPhone], // Added userPhone as a dependency
  );

  const handleOrderCollected = () => {
    Modal.confirm({
      title: 'Confirm Order Collection',
      content: 'Have you verified that all products are available?',
      onOk: () => {
        console.log('Order collected');
        setOpen(false);
        setCollected(true);
        axiosInstance
          .post('/partner/delivery/collected', { orderId: orderDetails?._id })
          .then(({ data }) => {
            setDirection(data.direction);
            localStorage.setItem('direction', JSON.stringify(data.direction));
          });
      },
    });
  };

  const handleOrderDelivered = () => {
    axiosInstance.post('/partner/delivery/delivered', { orderId: orderDetails?._id }).then(() => {
      navigate('/partner/delivery-summary');
    });
  };

  const renderActionButton = () => {
    if (!storeArrived) {
      return (
        <Tooltip title="Confirm your arrival at the store">
          <Button type="default" onClick={onReachedStore}>
            Reached Store
          </Button>
        </Tooltip>
      );
    }

    if (storeArrived && !collected) {
      return (
        <Tooltip title="Click to confirm order collection after checking all products">
          <Button type="primary" onClick={handleOrderCollected} disabled={!storeArrived}>
            Order Collected
          </Button>
        </Tooltip>
      );
    }

    if (collected && !userReached) {
      return (
        <Tooltip title="Confirm your arrival at the user's destination">
          <Button type="primary" onClick={onReachedUser}>
            Destination Reached
          </Button>
        </Tooltip>
      );
    }

    return null; // No action if everything is done
  };

  return (
    orderDetails && (
      <>
        <Row gutter={[16, 16]} style={{ marginBlock: 10, justifyContent: 'center' }}>
          <Col>{renderActionButton()}</Col>
          <Col>
            <Button type="primary" onClick={showDrawer}>
              View Order Details
            </Button>
          </Col>
        </Row>

        <Drawer
          title={`Order Details - #${orderDetails?._id}`}
          onClose={onClose}
          open={open}
          placement="bottom"
          height={400}
        >
          <Card bordered={false}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Title level={4}>Instructions for Delivery Partner</Title>
              <Typography.Text>
                Please check that all products in the order are available before confirming
                collection.
              </Typography.Text>
              <Divider />

              <Title level={4}>Order Summary</Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Typography.Text strong>Distance to Store:</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text>{distance ? `${distance} m` : 'Not available'}</Typography.Text>
                </Col>

                <Col span={12}>
                  <Typography.Text strong>Estimated Duration:</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text>
                    {duration ? `${duration} min` : 'Not available'}
                  </Typography.Text>
                </Col>

                <Col span={12}>
                  <Typography.Text strong>Total Amount:</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text>{totalAmount} Rs</Typography.Text>
                </Col>
              </Row>

              <Divider />

              <Title level={4}>Order Items</Title>
              {orderDetails.items.map((item) => (
                <Row key={item.productId} gutter={[16, 16]}>
                  <Col span={12}>
                    <Typography.Text>{item?.productName || item.productId}</Typography.Text>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>Qty: {item.quantity}</Typography.Text>
                  </Col>
                </Row>
              ))}
            </Space>
          </Card>
        </Drawer>

        <Modal
          open={userReached}
          footer={[
            <Button key="submit" type="primary" onClick={handleOrderDelivered}>
              Delivered
            </Button>,
          ]}
        >
          <Typography.Text>
            please call and verify the user before delivering the product +91xxxxxxxxxx
          </Typography.Text>
        </Modal>
      </>
    )
  );
}

export default OrderDetails;
