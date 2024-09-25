import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import FilterRow from '../components/FilterRow';
import ProductSection from './components/ProductSection';
import Footer from '../components/Footer';
import axiosInstance from '@/config/axios';
import PriceRangeSlider from './components/PriceRangeSlider';

export type SortOption = 'popularity' | 'price_asc' | 'price_desc' | 'rating';

function ProductsList() {
  const [sort, setSort] = useState<SortOption>('price_desc');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [breadcrumbLinks, setBreadcrumbLinks] = useState<{ label: string; href: string }[]>([
    { label: 'Home', href: '/home' },
  ]);

  // Function to fetch category hierarchy from the API
  const fetchBreadcrumbs = async (categoryId: string | null) => {
    if (!categoryId) return;

    try {
      const response = await axiosInstance.get(`/user/categories/child/${categoryId}/parent`);
      const categories = response.data?.parentCategories || []; // Assuming the response has an array of categories ordered from child to parent

      const dynamicLinks = categories.map((category: any) => ({
        label: category.name,
        href: `/products/list?categoryId=${category._id}`,
      }));

      // Combine the static breadcrumb links with dynamic ones
      setBreadcrumbLinks([{ label: 'Home', href: '/home' }, ...dynamicLinks]);
    } catch (error) {
      console.error('Error fetching breadcrumbs:', error);
    }
  };

  // Effect hook to update breadcrumbs when categoryId changes
  useEffect(() => {
    fetchBreadcrumbs(categoryId);
  }, [categoryId]);

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
          <PriceRangeSlider onSubmit={setPriceRange} />
          <Breadcrumb links={breadcrumbLinks} />
        </Box>
        <FilterRow sortOption={sort} setSortOption={setSort} />
        <ProductSection
          sortOption={sort}
          setSelectedCategoryId={setCategoryId}
          priceRange={priceRange}
        />
      </Container>
      <Footer />
    </>
  );
}

export default ProductsList;
