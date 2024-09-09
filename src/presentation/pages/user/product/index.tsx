import React from 'react';
import ProductCard from './components/ProductCard';
import ShopSlider from '../components/ShopSlider';
import { Box } from '@mui/material';
import ProductDescription from './components/ProductDescription';
import Footer from '../components/Footer';

const shops = Array.from({ length: 10 }, (_, index) => ({
  name: `Shop ${index + 1}`,
  location: 'Aluva',
  rating: (4.5 + Math.random() * 0.5).toFixed(1),
  distance: (Math.random() * 10).toFixed(1), // Distance between 0.0 and 10.0 KM
}));

function Index() {
  return (
    <>
      <ProductCard />
      <Box marginInline={10}>
        <ProductDescription />
        <ShopSlider shops={shops} />
      </Box>
      <Footer />
    </>
  );
}

export default Index;
