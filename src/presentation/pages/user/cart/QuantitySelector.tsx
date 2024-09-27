import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { CartItem } from '.';

interface QuantitySelectorProps {
  item: CartItem;
  min?: number;
  max?: number;
  onIncrement: (item: CartItem) => Promise<boolean>;
  onDecrement: (item: CartItem) => Promise<boolean>;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  item,
  min = 1,
  max = 10,
  onIncrement,
  onDecrement,
}) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity >= min && newQuantity <= max) {
      const isSuccessful =
        newQuantity > quantity ? await onIncrement(item) : await onDecrement(item);

      // Update the quantity state only if the increment/decrement was successful
      if (isSuccessful) {
        setQuantity(newQuantity);
      }
    }
  };

  // Increment and Decrement Handlers
  const increment = () => handleQuantityChange(quantity + 1);
  const decrement = () => handleQuantityChange(quantity - 1);

  // Scroll handler for increasing and decreasing count
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY < 0) {
      increment();
    } else {
      decrement();
    }
  };

  return (
    <div
      onWheel={handleScroll}
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={decrement}
        disabled={quantity <= min}
        style={{
          marginRight: '10px',
        }}
      >
        -
      </Button>

      <Input
        value={quantity}
        readOnly
        style={{
          width: '50px',
          textAlign: 'center',
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
          marginRight: '10px',
        }}
      />

      <Button
        onClick={increment}
        disabled={quantity >= max}
        style={{
          marginLeft: '10px',
        }}
      >
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;
