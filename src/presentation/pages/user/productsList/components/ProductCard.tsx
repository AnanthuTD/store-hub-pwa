import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Define product type
interface Product {
  image: string;
  name: string;
  department: string;
  oldPrice: string;
  newPrice: string;
  rating: number;
  availableColors: string[];
}

// Styles
const CardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  textAlign: 'center',
});

const ProductImage = styled('img')({
  width: '100%',
  height: 'auto',
  marginBottom: '10px',
});

const ColorOptions = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '5px',
});

const ColorCircle = styled(Box)(({ color }: { color: string }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: color,
  margin: '0 3px',
}));

const ProductCard: React.FC<Product> = ({
  image,
  name,
  department,
  oldPrice,
  newPrice,
  rating,
  availableColors,
}) => {
  return (
    <CardContainer>
      <ProductImage src={image} alt={name} />
      <Typography variant="h6" fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {department}
      </Typography>
      <Typography variant="body2" style={{ textDecoration: 'line-through' }}>
        {oldPrice}
      </Typography>
      <Typography variant="body1" color="primary" fontWeight="bold">
        {newPrice}
      </Typography>
      <Typography variant="body2">Rating: {rating}</Typography>
      <ColorOptions>
        {availableColors.map((color, index) => (
          <ColorCircle key={index} color={color} />
        ))}
      </ColorOptions>
    </CardContainer>
  );
};

export default ProductCard;
