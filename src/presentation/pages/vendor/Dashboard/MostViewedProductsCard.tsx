import React from 'react';
import { Card, List, Typography, Space } from 'antd';
import { ClockCircleOutlined, RiseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Product {
  id: number;
  name: string;
  icon: React.ReactNode;
  viewedAt: string;
}

interface MostViewedProductsCardProps {
  title?: string;
  growthPercentage: number;
  products: Product[];
}

const MostViewedProductsCard: React.FC<MostViewedProductsCardProps> = ({
  title = 'Most Viewed Products',
  growthPercentage,
  products,
}) => {
  return (
    <Card
      style={{
        width: 400,
        background: 'linear-gradient(145deg, #0d0d32, #14145a)',
        borderRadius: '12px',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
        color: 'white',
      }}
      styles={{ body: { padding: '20px' } }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Title level={5} style={{ color: 'white', margin: 0 }}>
          {title}
        </Title>
        <Text style={{ color: 'lightgreen' }}>
          <RiseOutlined /> +{growthPercentage}% this month
        </Text>

        <List
          itemLayout="horizontal"
          dataSource={products}
          renderItem={(product) => (
            <List.Item style={{ borderBottom: 'none', padding: '8px 0' }}>
              <List.Item.Meta
                avatar={product.icon}
                title={<Text style={{ color: 'white' }}>{product.name}</Text>}
                description={
                  <Space>
                    <ClockCircleOutlined style={{ color: 'lightgray' }} />
                    <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{product.viewedAt}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Space>
    </Card>
  );
};

export default MostViewedProductsCard;
