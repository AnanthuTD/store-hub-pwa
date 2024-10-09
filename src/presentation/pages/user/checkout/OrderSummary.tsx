// components/OrderSummary.js
import { Card, Checkbox } from 'antd';
import { WalletService } from '../wallet/walletService';
import { useEffect, useState } from 'react';

interface OrderSummaryProps {
  totalPrice: number;
  discount?: number;
  tax?: number;
  toggleWallet: (isChecked: boolean) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalPrice,
  discount = 0,
  tax = 0,
  toggleWallet,
}) => {
  const { getBalance } = new WalletService();
  const totalAmount = totalPrice - discount + tax;
  const [walletBalance, setWalletBalance] = useState(0);

  async function fetchWalletBalance() {
    const balance = await getBalance();
    setWalletBalance(balance);
  }
  useEffect(() => {
    fetchWalletBalance();
  }, []);

  return (
    <Card title="Order Summary">
      <p>Base Price: ₹{totalPrice}</p>
      {discount > 0 && <p>Discount: - ₹{discount}</p>}
      {tax > 0 && <p>Tax: ₹{tax}</p>}
      <Checkbox onChange={(e) => toggleWallet(e.target.checked)}>
        Use Wallet Balance ( ₹{walletBalance} )
      </Checkbox>
      <p>Total: ₹{totalAmount}</p>
    </Card>
  );
};

export default OrderSummary;
