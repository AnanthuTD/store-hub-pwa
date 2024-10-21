import { WalletFilled } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';
import React from 'react';

interface AnalyticsCardsProps {
  label: string;
  data: string;
  secondaryData: {
    value: string;
    type: 'danger' | 'success';
  };
}

const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ label, data /* , secondaryData */ }) => {
  return (
    <Card size="small">
      <Space
        align="center"
        size={'large'}
        style={{ width: '100%', justifyContent: 'space-between' }}
      >
        <Space.Compact direction="vertical" size={'small'}>
          <Typography.Text type="secondary">{label}</Typography.Text>
          <Space align="baseline">
            <Typography.Title level={4}>{data}</Typography.Title>
            {/* <Typography.Text type={secondaryData.type}>{secondaryData.value}</Typography.Text> */}
          </Space>
        </Space.Compact>
        <Card size="small" style={{ backgroundColor: '#0075FF' }}>
          <div
            style={{
              aspectRatio: '1/1',
              width: '17px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <WalletFilled />
          </div>
        </Card>
      </Space>
    </Card>
  );
};

export default AnalyticsCards;
