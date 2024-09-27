// components/OrderSummary.js
import { Card } from 'antd';

const OrderSummary = ({ totalPrice, discount = 0, tax = 0 }) => (
  <Card title="Order Summary">
    <p>Subtotal: ₹{totalPrice}</p>
    {discount > 0 && <p>Discount: - ₹{discount}</p>}
    {tax > 0 && <p>Tax: ₹{tax}</p>}
    <p>Total: ₹{totalPrice - discount + tax}</p>
  </Card>
);

export default OrderSummary;
