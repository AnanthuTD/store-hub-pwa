import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

// Define the props for ProductGrid
interface Product {
  image: string;
  name: string;
  department: string;
  oldPrice: string;
  newPrice: string;
  rating: number;
  availableColors: string[];
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
