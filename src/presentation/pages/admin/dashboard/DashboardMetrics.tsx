// components/DashboardMetrics.js

import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spin, Typography, Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axiosInstance from '@/config/axios';

const { Title } = Typography;
const { Option } = Select;

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState({ totalRevenue: [], newUsers: [], totalOrders: [] });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('weekly'); // Default filter to 'weekly'

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/admin/dashboard/metrics?filter=${filter}`);
      setMetrics(response.data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [filter]);

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      <Select
        defaultValue={filter}
        style={{ width: 200, marginBottom: 16 }}
        onChange={(value) => setFilter(value)}
      >
        <Option value="daily">Daily</Option>
        <Option value="weekly">Weekly</Option>
        <Option value="monthly">Monthly</Option>
        <Option value="yearly">Yearly</Option>
      </Select>

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Title level={4}>Total Revenue</Title>
            <LineChart width={300} height={200} data={metrics.totalRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#8884d8" />
            </LineChart>
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Title level={4}>New Users</Title>
            <LineChart width={300} height={200} data={metrics.newUsers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Title level={4}>Total Orders</Title>
            <LineChart width={300} height={200} data={metrics.totalOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#ff7300" />
            </LineChart>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="New Vendors">
            <LineChart width={500} height={300} data={metrics.newVendors}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#d34b29" />
            </LineChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="New Delivery Partners">
            <LineChart width={500} height={300} data={metrics.newDeliveryPartners}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#1f78b4" />
            </LineChart>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardMetrics;
