import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import ProductGrid from './ProductGrid';
import CustomPagination from './Pagination';
import axiosInstance from '@/config/axios';
import { useSearchParams } from 'react-router-dom';

interface Product {
  image: string;
  name: string;
  department: string;
  oldPrice: string;
  newPrice: string;
  rating: number;
  availableColors: string[];
}

const ProductSection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 16;

  // Fetch products from the backend
  const fetchProducts = async (page: number, query: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/user/products/search', {
        params: {
          page,
          q: query,
          limit: itemsPerPage,
        },
      });

      console.log(response.data);

      setProducts(response.data);
      setTotalPages(response.data?.totalPages || 1);
    } catch (err) {
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on page change or search query change
  useEffect(() => {
    fetchProducts(currentPage, searchParams.get('query') || '');
  }, [currentPage, searchParams]);

  // Pagination change handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box p={3}>
      {/* Search Box */}
      {/* <Box mb={3}>
        <InputBase
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '4px',
            backgroundColor: '#f1f8fc',
          }}
        />
      </Box> */}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <>
          <ProductGrid products={products} />
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Box>
  );
};

export default ProductSection;
