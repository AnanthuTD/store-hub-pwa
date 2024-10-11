import axiosInstance from '@/config/axios';
import { Card, Row, Col } from 'antd';
import { Radio } from 'antd';
import Title from 'antd/es/typography/Title';
import { Typography } from 'antd';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';

const { Text } = Typography;

const fetchCoupons = async (totalAmount: number) => {
  if (!totalAmount) return { message: 'Nothing to purchase', coupons: [] };

  try {
    const { data } = await axiosInstance.get<{ message: string; coupons: [] }>('/user/coupons', {
      params: { totalAmount },
    });

    return { message: data.message, coupons: data.coupons };
  } catch (err) {
    return {
      message: (err as AxiosError<{ message: string; coupons: [] }>).response?.data.message,
      coupons: [],
    };
  }
};

function CouponList({ onChange, totalAmount }) {
  const [coupons, setCoupons] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { coupons } = await fetchCoupons(totalAmount);
      setCoupons(coupons);
    };
    fetchData();
  }, [totalAmount]);

  return (
    <div>
      <Title level={4}>Select any one of the following coupons</Title>
      <Radio.Group onChange={(e) => onChange(e.target.value)}>
        <Row gutter={[16, 16]}>
          {coupons.map((coupon) => (
            <Col span={24} key={coupon.code}>
              <Card hoverable>
                <Radio value={coupon.code}>
                  <div>
                    <Title level={5}>{coupon.code}</Title>
                    <Text type="secondary">
                      Discount Type: {coupon.discountType} <br />
                      Discount Value: {coupon.discountValue}
                      {coupon.discountType === 'PERCENTAGE' ? '%' : ' flat'} <br />
                      Min Order Value: ₹{coupon.minOrderValue} <br />
                      Max Discount: ₹{coupon.maxDiscount} <br />
                      Expires on: {new Date(coupon.expirationDate).toLocaleDateString()} <br />
                      Per User Limit: {coupon.perUserLimit}
                    </Text>
                  </div>
                </Radio>
              </Card>
            </Col>
          ))}
        </Row>
      </Radio.Group>
    </div>
  );
}

export default CouponList;
