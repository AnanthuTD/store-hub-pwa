import React from 'react';
import { Collapse, Tag, Typography, Card as AntdCard, CollapseProps } from 'antd';
import { CaretRightOutlined, MoneyCollectOutlined } from '@ant-design/icons';

export interface Order {
  id: string;
  color: string;
  status: string;
}

function Card({ orders }: { orders: Order[] }) {
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    borderRadius: '8px',
    border: 'none',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const getItems = (): CollapseProps['items'] =>
    orders.map((order) => ({
      key: order.id,
      label: (
        <AntdCard style={panelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Typography.Text strong>Order No.</Typography.Text>
              <br />
              <Typography.Text type="secondary">#{order._id}</Typography.Text>
            </div>
            <Tag>{order.deliveryStatus}</Tag>
          </div>
        </AntdCard>
      ),
      children: (
        <div style={{ marginTop: 8 }}>
          <Typography.Text strong>{order?.store?.name}</Typography.Text>
          <br />

          {order?.store?.address && <AddressDisplay address={order.store.address} />}

          <br />
          <Typography.Text>
            <MoneyCollectOutlined style={{ marginRight: 4 }} />
            Earned: ₹{order?.deliveryFee || 0} {/* Assuming earned is a number */}
          </Typography.Text>
        </div>
      ),
      showArrow: false,
    }));

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: '#f0f2f5' }}
      items={getItems()}
    />
  );
}

const AddressDisplay = ({ address }) => {
  if (!address) return null;

  const { street, city, state, postalCode, country } = address;

  // Format the address in a clean way
  const formattedAddress = `${street}, ${city}, ${state} ${postalCode}, ${country}`;

  return <Typography.Text type="secondary">{formattedAddress}</Typography.Text>;
};

export default Card;
