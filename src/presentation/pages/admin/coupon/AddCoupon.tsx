import React from 'react';
import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import axiosInstance from '@/config/axios';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;

const AddCouponForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log('Received values: ', values);

    try {
      await axiosInstance.post('/admin/coupons', values);
      message.success('Coupon added successfully!');
      form.resetFields();
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(error.response?.data.message);
      } else {
        message.error('Failed to add coupon! Please try again after some time.');
      }
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="code"
        label="Coupon Code"
        rules={[{ required: true, message: 'Please input the coupon code!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="discountType"
        label="Discount Type"
        rules={[{ required: true, message: 'Please select a discount type!' }]}
      >
        <Select placeholder="Select discount type">
          <Option value="PERCENTAGE">Percentage</Option>
          <Option value="FIXED">Fixed Amount</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="discountValue"
        label="Discount Value"
        rules={[{ required: true, message: 'Please input the discount value!' }]}
      >
        <Input type="number" min={0} />
      </Form.Item>

      <Form.Item
        name="minOrderValue"
        label="Minimum Order Value"
        rules={[{ required: true, message: 'Please input the minimum order value!' }]}
      >
        <Input type="number" min={0} />
      </Form.Item>

      <Form.Item name="maxDiscount" label="Max Discount (Optional)">
        <Input type="number" min={0} />
      </Form.Item>

      <Form.Item
        name="expirationDate"
        label="Expiration Date"
        rules={[{ required: true, message: 'Please select an expiration date!' }]}
      >
        <DatePicker
          disabledDate={(current) => current && current < dayjs().endOf('day')}
          style={{ width: '100%' }}
        />
      </Form.Item>

      {/*  <Form.Item
        name="usageLimit"
        label="Usage Limit"
        rules={[{ required: true, message: 'Please input the usage limit!' }]}
      >
        <Input type="number" min={1} />
      </Form.Item> */}

      <Form.Item
        name="perUserLimit"
        label="Per User Limit"
        rules={[{ required: true, message: 'Please input the per user limit!' }]}
      >
        <Input type="number" min={1} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Coupon
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCouponForm;
