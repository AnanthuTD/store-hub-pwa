import React, { useState } from 'react';
import { Form, Button, message } from 'antd';
import ShopFormFields from './ShopFormFields';
import LocationMap from './LocationMap';
import { validationRules } from '../utils/validationRules';

const ShopRegistrationForm = () => {
  const [form] = Form.useForm();
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  const handleFinish = (values: any) => {
    if (!selectedPosition) {
      message.error('Please select a location on the map!');
      return;
    }
    const formData = { ...values, location: { coordinates: selectedPosition } };
    console.log('Form data:', formData);
    message.success('Shop Registered Successfully!');
    form.resetFields();
    setSelectedPosition(null);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <ShopFormFields />
      <Form.Item label="Location" name="coordinates" rules={validationRules.coordinates}>
        <LocationMap onLocationSelect={setSelectedPosition} selectedPosition={selectedPosition} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register Shop
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ShopRegistrationForm;
