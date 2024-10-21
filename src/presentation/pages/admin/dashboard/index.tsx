import { Row, Space, Col, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import AnalyticsCards from '../../vendor/Dashboard/AnalyticsCards';
import WelcomeCard from '../../vendor/Dashboard/WelcomeCard';
import MostViewedProductsCard from '../../vendor/Dashboard/MostViewedProductsCard';
import useUserProfile from '@/hooks/useUserProfile';
import axiosInstance from '@/config/axios';
import { RootState } from '@/infrastructure/redux/store';
import { useSelector } from 'react-redux';
import CouponCard from '../../vendor/Dashboard/CouponCard';
import TopStoresCard from './TopStores';
import TopDeliveryPartnersCard from './TopDeliveryPartnersCard';
import DashboardMetrics from './DashboardMetrics';

const { Option } = Select;

const App = () => {
  const store = useSelector((state: RootState) => state.vendor.selectedStore);
  const [analytics, setAnalytics] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [topStores, setTopStores] = useState([]);
  const [filter, setFilter] = useState('all');
  const [topDeliveryPartners, setTopDeliveryPartners] = useState([]);

  const handleRecord = () => {
    console.log('Recording...');
  };

  const handleFilterChange = (value: string) => {
    setFilter(value); // Update the filter state when user selects a different option
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          revenueDataResponse,
          userStatsResponse,
          orderStatsResponse,
          topStoresResponse,
          couponsResponse,
          topDeliveryPartnersResponse,
        ] = await Promise.all([
          axiosInstance.get(`/admin/dashboard/revenue`, { params: { filter } }), // Adjust the endpoint accordingly
          axiosInstance.get(`/admin/dashboard/users`, { params: { filter } }),
          axiosInstance.get(`/admin/dashboard/orders`, { params: { filter } }),
          axiosInstance.get(`/admin/dashboard/top-stores`, { params: { filter } }),
          axiosInstance.get(`/admin/dashboard/coupons-used`, { params: { filter } }),
          axiosInstance.get(`/admin/dashboard//top-delivery-partners`, { params: { filter } }),
        ]);

        const newAnalytics = [
          {
            label: 'Total Revenue',
            data: `₹${revenueDataResponse.data.totalMoneyGenerated.toFixed(2)}`,
          },
          { label: 'Total Profit', data: `₹${revenueDataResponse.data.totalProfit.toFixed(2)}` },
          {
            label: 'Total Paid to Vendors',
            data: `₹${revenueDataResponse.data.totalPaidToVendors.toFixed(2)}`,
          },
          {
            label: 'Total Paid To Delivery Partner',
            data: `₹${revenueDataResponse.data.totalPaidToDeliveryPartners.toFixed(2)}`,
          },
          { label: 'Total Users', data: userStatsResponse.data.totalUsers },
          { label: 'New Users (Last 30 Days)', data: userStatsResponse.data.newUsers },
          { label: 'Total Orders', data: orderStatsResponse.data.totalOrders },
          { label: 'Pending Orders', data: orderStatsResponse.data.pendingOrders },
          { label: 'Cancelled Orders', data: orderStatsResponse.data.cancelledOrders },
          {
            label: 'Order Fulfillment Rate',
            data: `${orderStatsResponse.data.orderFulfillmentRate.toFixed(2)}%`,
          },
        ];

        setAnalytics(newAnalytics);
        setTopStores(topStoresResponse.data.topStores);
        setCoupons(couponsResponse.data.couponsUsed);
        setTopDeliveryPartners(topDeliveryPartnersResponse.data.topDeliveryPartners);

        axiosInstance
          .get(`/admin/dashboard/top-products`, { params: { filter }, timeout: 50000 })
          .then(({ data }) => {
            setTopProducts(data.topProducts);
          });
      } catch (error) {
        message.error('Fetching data failed');
      }
    };

    fetchData();
  }, [filter, store?._id]); // Fetch data again when filter or store changes

  const vendor = useUserProfile('admin')!;

  return (
    <Space style={{ width: '100%', userSelect: 'none' }} direction="vertical" size={'large'}>
      {/* Filter UI */}
      <Select defaultValue="all" style={{ width: 200 }} onChange={handleFilterChange}>
        <Option value="all">All</Option>
        <Option value="daily">Daily</Option>
        <Option value="weekly">Weekly</Option>
        <Option value="monthly">Monthly</Option>
        <Option value="yearly">Yearly</Option>
      </Select>

      {/* Row for Analytics Cards with fixed spacing and 3 cards per row */}
      <Row gutter={[24, 24]} justify={'start'} style={{ marginTop: 20 }}>
        {analytics.map((data, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            {' '}
            {/* Each card takes up 1/3 of the row */}
            <AnalyticsCards
              data={`${data.data}`}
              label={data.label}
              secondaryData={{ type: 'success', value: '+55%' }} // Adjust this as necessary
            />
          </Col>
        ))}
      </Row>

      <WelcomeCard
        name={vendor?.profile?.name}
        welcomeText="Glad to see you again! Ask me anything."
        buttonText="Tap to record"
        onButtonClick={handleRecord}
      />

      <Row gutter={[24, 24]} justify={'start'}>
        <Col xs={24} sm={12} md={8}>
          <MostViewedProductsCard growthPercentage={30} products={topProducts} />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <TopStoresCard growthPercentage={30} stores={topStores} />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <TopDeliveryPartnersCard growthPercentage={30} partners={topDeliveryPartners} />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <CouponCard title="Most Used Coupons" coupon={coupons} />
        </Col>
      </Row>

      <DashboardMetrics />
    </Space>
  );
};

export default App;
