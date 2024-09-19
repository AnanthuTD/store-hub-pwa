import { Box, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import FilterRow from '../components/FilterRow';
import ProductSection from './components/ProductSection';
import Footer from '../components/Footer';

export type SortOption = 'popularity' | 'price_asc' | 'price_desc' | 'rating';

function ProductsList() {
  const [sort, setSort] = useState<SortOption>('price_desc');

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
        <FilterRow sortOption={sort} setSortOption={setSort} />
        <ProductSection sortOption={sort} />
      </Container>
      <Footer />
    </>
  );
}

export default ProductsList;
