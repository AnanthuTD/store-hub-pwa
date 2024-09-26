import React from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Define product type
interface Product {
  images: string[];
  name: string;
  price: string;
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

const ProductCard: React.FC<Product> = ({
  images,
  name,
  variants: [{ price }],
  _id,
  ratingSummary: { averageRating },
}) => {
  return (
    <CardContainer onClick={() => window.open(`/product?productId=${_id}`)}>
      <ProductImage src={images[0]} alt={name} />
      <Typography variant="h6" fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="body1" color="primary" fontWeight="bold">
        {price}
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Rating name="read-only" value={averageRating} readOnly precision={0.5} />
        <Typography style={{ marginLeft: '8px' }}>{averageRating}</Typography>
      </Box>
    </CardContainer>
  );
};

export default ProductCard;
