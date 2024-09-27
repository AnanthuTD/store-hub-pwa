// components/CartSummary.js
import { List, Card } from 'antd';

const CartSummary = ({ items }) => (
  <Card title="Cart Summary">
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={item.name}
            description={`Price: ₹${item.variant.discountedPrice} x Quantity: ${item.quantity}`}
          />
          <div>Total: ₹{item.totalPrice}</div>
        </List.Item>
      )}
    />
  </Card>
);

export default CartSummary;
