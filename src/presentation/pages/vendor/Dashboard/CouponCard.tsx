import React from 'react';
import { Card, List, Typography, Space } from 'antd';

const { Title, Text } = Typography;

interface data {
  id: number;
  name: string;
  icon: React.ReactNode;
  viewedAt: string;
}

interface MostViewedProductsCardProps {
  title?: string;
  // growthPercentage: number;
  coupon: data[];
}

const CouponCard: React.FC<MostViewedProductsCardProps> = ({
  title = 'Most Used Coupons',
  // growthPercentage,
  coupon,
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
        {/*  <Text style={{ color: 'lightgreen' }}>
          <RiseOutlined /> +{growthPercentage}% this month
        </Text> */}

        <List
          itemLayout="horizontal"
          dataSource={coupon}
          renderItem={(data) => (
            <List.Item style={{ borderBottom: 'none', padding: '8px 0' }}>
              <List.Item.Meta
                // avatar={data?.image[0]}
                title={<Text style={{ color: 'white' }}>{data._id}</Text>}
                description={
                  <Space>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Total discount: {data.totalDiscount}
                    </Text>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Count: {data.count}</Text>
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

export default CouponCard;
