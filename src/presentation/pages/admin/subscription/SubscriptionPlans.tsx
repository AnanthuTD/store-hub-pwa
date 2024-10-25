// SubscriptionPlans.tsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Modal, message, InputNumber } from 'antd';
import axiosInstance from '@/config/axios';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: number;
  productLimit: number;
}

const SubscriptionPlans: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPlans = async () => {
    try {
      const { data } = await axiosInstance.get<SubscriptionPlan[]>('/admin/subscription-plans');
      setPlans(data);
    } catch (error) {
      message.error('Failed to load plans.');
    }
  };

  const handleAddPlan = async (values: Omit<SubscriptionPlan, 'id'>) => {
    try {
      setLoading(true);
      await axiosInstance.post('/admin/subscription-plans', values);
      message.success('Subscription plan added successfully!');
      fetchPlans();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to add plan.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (planId: string) => {
    try {
      await axiosInstance.delete(`/admin/subscription-plans/${planId}`);
      message.success('Subscription plan deleted!');
      fetchPlans();
    } catch (error) {
      message.error('Failed to delete plan.');
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price (INR)', dataIndex: 'price', key: 'price' },
    { title: 'Duration (Months)', dataIndex: 'duration', key: 'duration' },
    { title: 'Product Limit', dataIndex: 'productLimit', key: 'productLimit' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: SubscriptionPlan) => (
        <Button type="primary" danger onClick={() => handleDeletePlan(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Subscription Plan
      </Button>

      <Table columns={columns} dataSource={plans} rowKey="id" style={{ marginTop: 20 }} />

      <Modal
        title="Add Subscription Plan"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddPlan} layout="vertical">
          <Form.Item
            name="name"
            label="Plan Name"
            rules={[{ required: true, message: 'Please enter the plan name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price (INR)"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Cycle (Months)"
            rules={[{ required: true, message: 'Please enter the duration' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="productLimit"
            label="Product Limit"
            rules={[{ required: true, message: 'Please enter the product limit' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Plan
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default SubscriptionPlans;
