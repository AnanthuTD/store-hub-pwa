import React from 'react';
import { Card as AntdCard, Typography, Tag, Collapse } from 'antd';
import { Order } from './Card';

const { Panel } = Collapse;

const OrderCard = ({ order }: { order: Order }): JSX.Element => {
  return (
    <AntdCard>
      <Collapse>
        <Panel
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Typography.Text strong>Order No.</Typography.Text>
                <br />
                <Typography.Text type="secondary">#{order.id}</Typography.Text>
              </div>
              <Tag color={order.color}>{order.status}</Tag>
            </div>
          }
          key={order.id}
        >
          {/* Add additional details here */}
          <Typography.Paragraph>
            {/* Replace with actual details or any other relevant content */}
            Order details for order #{order.id}. This section can contain more information such as
            items purchased, order date, etc.
          </Typography.Paragraph>
        </Panel>
      </Collapse>
    </AntdCard>
  );
};

export default OrderCard;
