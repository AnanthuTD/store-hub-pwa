// components/CartSummary.js
import { List, Card } from 'antd';

const CartSummary = ({ items }) => {
  return (
    <Card title="Cart Summary">
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => {
          const price = item.variant.discountedPrice || item.variant.price;
          return (
            <List.Item>
              <List.Item.Meta
                title={item.name}
                description={`Price: ₹${price} x Quantity: ${item.quantity}`}
              />
              <div>Total: ₹{item.totalPrice}</div>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default CartSummary;
