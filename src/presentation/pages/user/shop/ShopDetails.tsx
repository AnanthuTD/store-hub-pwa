import React from 'react';
import { Card, Col, Row, Typography, Tag, Image, Space } from 'antd';

const { Title, Text } = Typography;

interface ShopDetailProps {
  shop: any;
}

const ShopDetail: React.FC<ShopDetailProps> = ({ shop }) => {
  const {
    name,
    location,
    categories,
    isVerified,
    address,
    description,
    contactInfo,
    operatingHours,
    images,
    rating,
  } = shop;

  return (
    <div style={{ padding: '20px' }}>
      <Card title={name} bordered={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Space direction="vertical" size="middle">
              <Title level={4}>Location</Title>
              <Text>
                {`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}
              </Text>
              <br />
              <Text>Coordinates: {`${location.coordinates[0]}, ${location.coordinates[1]}`}</Text>
              <br />
              <Tag color={isVerified ? 'green' : 'red'}>
                {isVerified ? 'Verified' : 'Not Verified'}
              </Tag>
              <br />
              <Title level={4}>Categories</Title>
              <Text>{categories || 'N/A'}</Text>
              <br />
              <Title level={4}>Contact Information</Title>
              <Text>Email: {contactInfo.email || 'N/A'}</Text>
              <br />
              <Text>Phone: {contactInfo.phone || 'N/A'}</Text>
              <br />
              <Text>Website: {contactInfo.website || 'N/A'}</Text>
              <br />
              <Title level={4}>Operating Hours</Title>
              {Object.entries(operatingHours).map(([day, hours]) => (
                <Text key={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}: {hours || 'Closed'}
                  <br />
                </Text>
              ))}
            </Space>
          </Col>
          <Col span={12}>
            {images && images.length > 0 ? (
              <Image.PreviewGroup>
                {images.map((src, index) => (
                  <Image key={index} width={200} src={src} />
                ))}
              </Image.PreviewGroup>
            ) : (
              <Text>No Images Available</Text>
            )}
            <br />
            <Title level={4}>Description</Title>
            <Text>{description || 'N/A'}</Text>
            <br />
            <Title level={4}>Rating</Title>
            <Text>{rating ? rating.toFixed(1) : 'N/A'} / 5</Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ShopDetail;
