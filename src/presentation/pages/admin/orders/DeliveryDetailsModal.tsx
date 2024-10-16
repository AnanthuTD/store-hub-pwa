import React, { useEffect, useState } from 'react';
import { Modal, Descriptions, Spin, message } from 'antd';
import axiosInstance from '@/config/axios';

interface IDeliveryDetails {
  orderId: string;
  orderDate: string;
  deliveryStatus: string;
  deliveryPartner: {
    partnerId: string | null;
    partnerName: string | null;
  };
  deliveryLocation: {
    type: string;
    coordinates: [number, number];
  };
  shippingAddress: string;
  deliveryFee: number;
  platformFee: number;
  deliveryOTP: number | null;
}

interface DeliveryDetailsModalProps {
  orderId: string;
  isVisible: boolean;
  onClose: () => void;
}

const DeliveryDetailsModal: React.FC<DeliveryDetailsModalProps> = ({
  orderId,
  isVisible,
  onClose,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [details, setDetails] = useState<IDeliveryDetails | null>(null);

  useEffect(() => {
    if (isVisible) {
      const fetchDeliveryDetails = async () => {
        try {
          const response = await axiosInstance.get(`/admin/orders/${orderId}/delivery-details`);
          if (response.data.success) {
            setDetails(response.data.data);
          } else {
            message.error('Failed to fetch delivery details');
          }
        } catch (error) {
          console.error('Error fetching delivery details:', error);
          message.error('Error fetching delivery details');
        } finally {
          setLoading(false);
        }
      };

      fetchDeliveryDetails();
    }
  }, [orderId, isVisible]);

  return (
    <Modal title="Delivery Details" visible={isVisible} onCancel={onClose} footer={null}>
      {loading ? (
        <Spin tip="Loading delivery details..." />
      ) : (
        details && (
          <Descriptions layout="vertical" bordered>
            <Descriptions.Item label="Order ID">{details.orderId}</Descriptions.Item>
            <Descriptions.Item label="Order Date">
              {new Date(details.orderDate).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Delivery Status">{details.deliveryStatus}</Descriptions.Item>
            <Descriptions.Item label="Delivery Partner">
              {details.deliveryPartner.partnerName || 'Not Assigned'}
            </Descriptions.Item>
            <Descriptions.Item label="Delivery Location">
              {`Lat: ${details.deliveryLocation.coordinates[1]}, Long: ${details.deliveryLocation.coordinates[0]}`}
            </Descriptions.Item>
            <Descriptions.Item label="Shipping Address">
              {details.shippingAddress}
            </Descriptions.Item>
            <Descriptions.Item label="Delivery Fee">{details.deliveryFee} Rs</Descriptions.Item>
            <Descriptions.Item label="Platform Fee">{details.platformFee} Rs</Descriptions.Item>
            {details.deliveryOTP && (
              <Descriptions.Item label="Delivery OTP">{details.deliveryOTP}</Descriptions.Item>
            )}
          </Descriptions>
        )
      )}
    </Modal>
  );
};

export default DeliveryDetailsModal;
