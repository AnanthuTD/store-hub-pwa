import { Row, Space, Col, message } from 'antd';
import React, { useEffect, useState } from 'react';
import AnalyticsCards from './AnalyticsCards';
import WelcomeCard from './WelcomeCard';
import SatisfactionRateCard from './SatisfactionRateCard';
import MostViewedProductsCard from './MostViewedProductsCard';
import useUserProfile from '@/hooks/useUserProfile';
import axiosInstance from '@/config/axios';
import { RootState } from '@/infrastructure/redux/store';
import { useSelector } from 'react-redux';
import CouponCard from './CouponCard';
import RevenueGraph from './RevenueGraph';

const App = () => {
  const store = useSelector((state: RootState) => state.vendor.selectedStore);
  const [analytics, setAnalytics] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [satisfactionRate, setSatisfactionRate] = useState(0);
  const [revenueData, setRevenueData] = useState({ daily: [], monthly: [], yearly: [] });

  const handleRecord = () => {
    console.log('Recording...');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          revenueData,
          returnsData,
          cancellationsData,
          averageOrderValueData,
          topProductsData,
          couponsData,
          satisfactionRating,
          revenueChartsData,
        ] = await Promise.all([
          axiosInstance.get(`/vendor/dashboard/store/${store?._id}/revenue`),
          axiosInstance.get(`/vendor/dashboard/store/${store?._id}/returns`),
          axiosInstance.get(`/vendor/dashboard/store/${store?._id}/cancellations`),
          axiosInstance.get(`/vendor/dashboard/store/${store?._id}/average-order-value`),
          axiosInstance.get(`/vendor/dashboard/store/${store?._id}/top-products`),
          axiosInstance.get(`/vendor/dashboard/store/${store?._id}/coupons`),
          axiosInstance.get(`/vendor/dashboard/store/${store?._id}/satisfaction-rate`),
          axiosInstance.get(`/vendor/dashboard/store/${store?._id}/revenue-charts`),
        ]);

        const newAnalytics = [
          { label: 'Total Revenue', data: revenueData.data.totalRevenue },
          { label: 'Total Returns Requests', data: returnsData.data.totalReturnRequests },
          { label: 'Completed Returns', data: returnsData.data.completedReturns },
          { label: 'Cancelled Orders', data: cancellationsData.data.cancelledOrders },
          {
            label: 'Average Order Value',
            data: averageOrderValueData.data.averageOrderValue.toFixed(2),
          },
        ];

        setAnalytics(newAnalytics);
        setTopProducts(topProductsData.data);
        setCoupons(couponsData.data);
        setSatisfactionRate(satisfactionRating.data);
        setRevenueData(revenueChartsData.data);
      } catch (error) {
        message.error('Fetching data failed');
      }
    };

    fetchData();
  }, [store?._id]);

  const vendor = useUserProfile('vendor')!;

  return (
    <Space
      style={{ width: '100%', userSelect: 'none' }}
      styles={{ item: { width: '100%' } }}
      direction="vertical"
      size={'large'}
    >
      <Row justify={'space-evenly'}>
        {analytics.map((data, index) => (
          <Col key={index}>
            <AnalyticsCards
              data={`${data.data}`}
              label={data.label}
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

      <SatisfactionRateCard rate={satisfactionRate} />

      <Row justify={'space-evenly'}>
        <Col>
          <MostViewedProductsCard growthPercentage={30} products={topProducts} />
        </Col>
        <Col>
          <CouponCard coupon={coupons} />
        </Col>
      </Row>

      <RevenueGraph revenueData={revenueData} />
    </Space>
  );
};

export default App;
