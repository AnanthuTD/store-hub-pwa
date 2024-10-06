import React, { useEffect, useState } from 'react';
import { Form, Button, message, Modal } from 'antd';
import ShopFormFields from './ShopFormFields';
import LocationMap from '../../../../components/location/LocationMap';
import axiosInstance from '@/config/axios';
import { FormData, LocationData } from './types';
import useShopData from './hooks/useShopData';
import formatData from './utils/formatData';
import LocationPreview from '../../../../components/location/LocationPreview';

const ShopRegistrationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, shopId, fetchShopData } = useShopData(form);

  useEffect(() => {
    fetchShopData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      setSelectedLocation(data.location);
    }
  }, [data]);

  const handleFinish = (values: FormData) => {
    const formData = formatData({ ...values, location: selectedLocation });
    const request = shopId
      ? axiosInstance.put(`/vendor/shop/${shopId}`, formData)
      : axiosInstance.post('/vendor/shop/register', formData);

    request
      .then(() => {
        message.success(shopId ? 'Shop Updated Successfully!' : 'Shop Registered Successfully!');
        if (!shopId) form.resetFields();
      })
      .catch((error) => {
        message.error(shopId ? 'Failed to update shop.' : 'Failed to register shop.');
        console.error(error);
      });
  };

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);
  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <ShopFormFields data={data} />

      <LocationPreview selectedLocation={selectedLocation} onOpenModal={handleOpenModal} />

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {data ? 'Update Shop Info' : 'Register Shop'}
        </Button>
      </Form.Item>

      <Modal
        title="Select Shop Location"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        <LocationMap onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />
      </Modal>
    </Form>
  );
};

export default ShopRegistrationForm;
