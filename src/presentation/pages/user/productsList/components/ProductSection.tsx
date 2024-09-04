import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProductGrid from './ProductGrid';
import CustomPagination from './Pagination';

// Sample data
const products = Array(50).fill({
  image: 'https://via.placeholder.com/150',
  name: 'Graphic Design',
  department: 'English Department',
  oldPrice: '$16.4',
  newPrice: '$6.4',
  rating: 4.0,
  availableColors: ['#1e90ff', '#32cd32', '#ff4500', '#ffd700'],
});

const ProductSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Pagination change handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get current products
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Box p={3}>
      <ProductGrid products={currentProducts} />
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default ProductSection;
