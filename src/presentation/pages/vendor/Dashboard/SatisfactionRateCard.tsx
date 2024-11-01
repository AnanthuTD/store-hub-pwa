import React from 'react';
import { Card, Progress, Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface SatisfactionRateCardProps {
  title?: string;
  rate: number;
  description?: string;
}

const SatisfactionRateCard: React.FC<SatisfactionRateCardProps> = ({
  title = 'Customer Satisfaction Rate',
  rate,
  description = 'Based on rating',
}) => {
  return (
    <Card
      style={{
        width: 300,
        background: 'linear-gradient(145deg, #0d0d32, #14145a)',
        borderRadius: '12px',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
        color: 'white',
      }}
      styles={{ body: { padding: '20px', textAlign: 'center' } }}
    >
      <Title level={5} style={{ color: 'white' }}>
        {title}
      </Title>
      <Progress
        type="circle"
        percent={rate}
        size={100}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        format={() => <SmileOutlined style={{ fontSize: 24 }} />}
      />
      <div style={{ marginTop: 20 }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          {rate?.toFixed(2)}%
        </Title>
        <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{description}</Text>
      </div>
    </Card>
  );
};

export default SatisfactionRateCard;
