import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ProductGrid from './ProductGrid';
import CustomPagination from './Pagination';
import axiosInstance from '@/config/axios';
import { useSearchParams } from 'react-router-dom';
import ProductCardSkeleton from './ProductCardSkeleton'; // Import the skeleton component

interface Product {
  image: string;
  name: string;
  department: string;
  oldPrice: string;
  newPrice: string;
  rating: number;
  availableColors: string[];
}

interface ProductSectionProps {
  sortOption: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ sortOption }) => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 16;

  // Fetch products on page change or search query change
  useEffect(() => {
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
            sortBy: sortOption,
          },
        });

        setProducts(response.data || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts(currentPage, searchParams.get('query') || '');
  }, [currentPage, searchParams, sortOption]);

  // Pagination change handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box p={3}>
      {loading && !products.length ? (
        // Show skeleton loader if data is loading and no products are present
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
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
