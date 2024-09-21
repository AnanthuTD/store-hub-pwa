import React from 'react';
import ProductCard from './components/ProductCard';
import ShopSlider from '../components/ShopSlider';
import { Box, Typography } from '@mui/material';
import ProductDescription from './components/ProductDescription';
import Footer from '../components/Footer';
import { useSearchParams } from 'react-router-dom';
import useProductDetails from './hooks/useProductDetails';

const shops = Array.from({ length: 10 }, (_, index) => ({
  name: `Shop ${index + 1}`,
  location: 'Aluva',
  rating: (4.5 + Math.random() * 0.5).toFixed(1),
  distance: (Math.random() * 10).toFixed(1), // Distance between 0.0 and 10.0 KM
}));

function Index() {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get('productId');

  const { loading, product, error } = useProductDetails(productId);

  if (!productId) {
    return <h2>Product not found</h2>;
  }

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error loading product details: {error}</Typography>;
  }

  if (!product) {
    return <Typography>No product found</Typography>;
  }

  return (
    <>
      <ProductCard product={product} />
      <Box marginInline={10}>
        <ProductDescription product={product} />
        <ShopSlider shops={shops} />
      </Box>
      <Footer />
    </>
  );
}

export default Index;
