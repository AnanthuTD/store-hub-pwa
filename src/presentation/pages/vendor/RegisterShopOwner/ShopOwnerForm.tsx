import React from 'react';
import { Button, Form, Input, Typography } from 'antd';

const ShopOwnerForm: React.FC<{
  onSubmit: (formData: any) => void;
  initialValues: any;
}> = ({ onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <>
      <Typography.Title level={4}>Shop Owner Registration</Typography.Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={initialValues}>
        {/* First Name */}
        <Form.Item
          label="First Name"
          name={['profile', 'firstName']}
          rules={[
            { required: true, message: 'First Name is required' },
            { min: 2, message: 'First Name must be at least 2 characters' },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Last Name */}
        <Form.Item
          label="Last Name"
          name={['profile', 'lastName']}
          rules={[
            { required: true, message: 'Last Name is required' },
            { min: 2, message: 'Last Name must be at least 2 characters' },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Phone */}
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: 'Phone number is required' },
            {
              pattern: /^[+][0-9]{1,3}[0-9]{9,12}$/,
              message: 'Enter a valid phone number (e.g., +911234567890)',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Email */}
        <Form.Item label="Email" name="email">
          <Input readOnly />
        </Form.Item>

        {/* Address */}
        <Typography.Title level={5}>Address Details</Typography.Title>

        <Form.Item
          label="Street"
          name={['profile', 'address', 'street']}
          rules={[{ required: true, message: 'Street is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="City"
          name={['profile', 'address', 'city']}
          rules={[{ required: true, message: 'City is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="State"
          name={['profile', 'address', 'state']}
          rules={[{ required: true, message: 'State is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Postal Code"
          name={['profile', 'address', 'postalCode']}
          rules={[
            { required: true, message: 'Postal code is required' },
            { pattern: /^[0-9]{6}$/, message: 'Postal code must be 6 digits' },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Bank Details */}
        <Typography.Title level={5}>Bank Details</Typography.Title>

        <Form.Item
          label="Account Holder Name"
          name={['bankDetails', 'accountHolderName']}
          rules={[{ required: true, message: 'Account holder name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Account Number"
          name={['bankDetails', 'accountNumber']}
          rules={[
            { required: true, message: 'Account number is required' },
            { pattern: /^[0-9]{9,18}$/, message: 'Account number must be between 9 and 18 digits' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Bank Name"
          name={['bankDetails', 'bankName']}
          rules={[{ required: true, message: 'Bank name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="IFSC Code"
          name={['bankDetails', 'ifscCode']}
          rules={[
            { required: true, message: 'IFSC code is required' },
            { pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'Enter a valid IFSC code' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ShopOwnerForm;
