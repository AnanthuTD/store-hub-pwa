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
  setSelectedCategoryId: (categoryId: string) => void;
  priceRange: number[];
}

const ProductSection: React.FC<ProductSectionProps> = ({
  sortOption,
  setSelectedCategoryId,
  priceRange,
}) => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 16;

  useEffect(() => {
    const query = searchParams.get('query');
    const categoryId = searchParams.get('categoryId');

    const fetchProductsByQuery = async (page: number, query: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get('/user/products/search', {
          params: {
            page,
            q: query,
            limit: itemsPerPage,
            sortBy: sortOption,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
          },
        });
        setProducts(response.data.products || []);
        setTotalPages(Math.ceil(response.data.totalPages) || 1);
      } catch (err) {
        setError('Failed to fetch products by search query.');
      } finally {
        setLoading(false);
      }
    };

    const fetchProductsByCategory = async (page: number, categoryId: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/user/products/category/${categoryId}`, {
          params: {
            page,
            limit: itemsPerPage,
            sortBy: sortOption,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
          },
        });
        setProducts(response.data.products || []);
        setTotalPages(Math.ceil(response.data.totalPages) || 1);
      } catch (err) {
        setError('Failed to fetch products by category.');
      } finally {
        setLoading(false);
      }
    };

    // Determine which API to call based on query or categoryId

    if (categoryId) {
      setSelectedCategoryId(categoryId);
      fetchProductsByCategory(currentPage, categoryId);
    } else {
      fetchProductsByQuery(currentPage, query || '');
    }
  }, [currentPage, searchParams, sortOption, priceRange, setSelectedCategoryId]);

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
