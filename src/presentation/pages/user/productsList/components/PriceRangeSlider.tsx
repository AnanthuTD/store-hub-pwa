import React, { useState } from 'react';
import { Button, Row, Slider, Typography } from 'antd';

const { Title, Text } = Typography;

interface PriceRangeSliderProps {
  onSubmit: (priceRange: number[]) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ onSubmit }) => {
  const [priceRange, setPriceRange] = useState([500, 20000]);

  const onChange = (value: number[]) => {
    setPriceRange(value);
  };

  return (
    <Row align={'middle'}>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Title level={4}>Select Price Range</Title>
        <Slider
          range
          min={0}
          max={20000}
          onChange={onChange}
          value={priceRange}
          step={500} // Equal spacing between marks
          marks={{
            0: 'min',
            500: '',
            1000: '',
            2000: '',
            5000: '',
            10000: '',
            15000: '',
            20000: '₹20,000+',
          }}
        />
        <Text>
          Selected Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}+
        </Text>
      </div>

      <Button onClick={() => onSubmit(priceRange)} style={{ marginInline: '10px' }}>
        Go
      </Button>
    </Row>
  );
};

export default PriceRangeSlider;
