import { Row, Space, Col, Avatar } from 'antd';
import React from 'react';
import AnalyticsCards from './AnalyticsCards';
import WelcomeCard from './WelcomeCard';
import SatisfactionRateCard from './SatisfactionRateCard';
import { SketchOutlined } from '@ant-design/icons';
import MostViewedProductsCard from './MostViewedProductsCard';
import useUserProfile from '@/hooks/useUserProfile';

const products = [
  {
    id: 1,
    name: 'product 1',
    icon: <Avatar icon={<SketchOutlined />} />,
    viewedAt: '22 DEC 7:20 PM',
  },
  {
    id: 2,
    name: 'product 2',
    icon: <Avatar icon={<SketchOutlined />} />,
    viewedAt: '21 DEC 11:21 PM',
  },
  {
    id: 3,
    name: 'product 3',
    icon: <Avatar icon={<SketchOutlined />} />,
    viewedAt: '21 DEC 9:28 PM',
  },
  {
    id: 4,
    name: 'product 4',
    icon: <Avatar icon={<SketchOutlined />} />,
    viewedAt: '20 DEC 3:52 PM',
  },
  {
    id: 5,
    name: 'product 2',
    icon: <Avatar icon={<SketchOutlined />} />,
    viewedAt: '19 DEC 11:35 PM',
  },
  {
    id: 6,
    name: 'product 6',
    icon: <Avatar icon={<SketchOutlined />} />,
    viewedAt: '18 DEC 4:41 PM',
  },
];

const App = () => {
  const handleRecord = () => {
    console.log('Recording...');
  };

  const vendor = useUserProfile('vendor')!;

  return (
    <Space style={{ width: '100%' }} styles={{ item: { width: '100%' } }} direction="vertical">
      <Row justify={'space-evenly'}>
        {[1, 2, 3, 4].map((row) => (
          <Col key={row}>
            <AnalyticsCards
              data={'₹50000'}
              label="Today's Revenue"
              secondaryData={{ type: 'success', value: '+55%' }}
            />
          </Col>
        ))}
      </Row>

      <WelcomeCard
        name={vendor?.profile?.firstName + ' ' + vendor?.profile?.lastName}
        welcomeText="Glad to see you again! Ask me anything."
        buttonText="Tap to record"
        onButtonClick={handleRecord}
      />

      <SatisfactionRateCard rate={95} />

      <MostViewedProductsCard growthPercentage={30} products={products} />
    </Space>
  );
};

export default App;
