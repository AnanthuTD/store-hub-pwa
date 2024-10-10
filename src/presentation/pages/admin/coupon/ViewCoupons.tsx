import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Modal, message, DatePicker } from 'antd';
import axiosInstance from '@/config/axios';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

interface Coupon {
  key: string;
  code: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  expirationDate: string;
}

const CouponTable: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch the coupons from your API (placeholder data for example)
    const fetchCoupons = async () => {
      const { data } = await axiosInstance.get('/admin/coupons'); // Replace with your API endpoint
      setCoupons(data);
    };

    fetchCoupons();
  }, []);

  const handleEditClick = (coupon: Coupon) => {
    coupon.expirationDate = dayjs(coupon.expirationDate);
    setEditingCoupon(coupon);
    form.setFieldsValue(coupon);
  };

  const handleCancel = () => {
    setEditingCoupon(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      await axiosInstance.put(`/admin/coupons/${editingCoupon?.code}`, values);

      message.success('Coupon updated successfully!');
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon.key === editingCoupon?.key ? { ...coupon, ...values } : coupon,
        ),
      );
      setEditingCoupon(null);
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('Please fill in all required fields correctly.');
    }
  };

  const columns = [
    { title: 'Coupon Code', dataIndex: 'code', key: 'code' },
    { title: 'Discount Type', dataIndex: 'discountType', key: 'discountType' },
    { title: 'Discount Value', dataIndex: 'discountValue', key: 'discountValue' },
    { title: 'Minimum Order Value', dataIndex: 'minOrderValue', key: 'minOrderValue' },
    {
      title: 'Expiration Date',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (value) => {
        return dayjs(value).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, coupon: Coupon) => (
        <Button onClick={() => handleEditClick(coupon)}>Edit</Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={coupons} columns={columns} rowKey={(data) => data.code} />

      {editingCoupon && (
        <Modal
          title="Edit Coupon"
          open={!!editingCoupon}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleSave}>
              Save
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="code"
              label="Coupon Code"
              rules={[{ required: true, message: 'Please input the coupon code!' }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item name="discountType" label="Discount Type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="discountValue" label="Discount Value" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="minOrderValue" label="Minimum Order Value">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="expirationDate" label="Expiration Date" rules={[{ required: true }]}>
              <DatePicker disabledDate={(current) => current && current < dayjs().endOf('day')} />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default CouponTable;
