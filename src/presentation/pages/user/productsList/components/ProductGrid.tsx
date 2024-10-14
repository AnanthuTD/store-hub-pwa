// ProductGrid.tsx
import React, { useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import ProductCard from './ProductCard';

// Define the props for ProductGrid
export interface ProductGridInterface {
  image: string;
  name: string;
  department: string;
  oldPrice: string;
  newPrice: string;
  rating: number;
  availableColors: string[];
}

interface ProductGridProps {
  products: ProductGridInterface[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // Number of products per page

  // Calculate the current products to display
  const indexOfLastProduct = page * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Grid container spacing={2}>
        {currentProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }} // Center the pagination
      />
    </>
  );
};

export default ProductGrid;
