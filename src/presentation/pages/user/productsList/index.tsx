import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import FilterRow from '../components/FilterRow';
import ProductSection from './components/ProductSection';
import Footer from '../components/Footer';

function ProductsList() {
  const breadcrumbLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
  ];

  return (
    <>
      <Container>
        <Box
          sx={{ padding: '20px' }}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography fontWeight={'bold'}>Products</Typography>
          <Breadcrumb links={breadcrumbLinks} />
        </Box>
        <FilterRow />
        <ProductSection />
      </Container>
      <Footer />
    </>
  );
}

export default ProductsList;
