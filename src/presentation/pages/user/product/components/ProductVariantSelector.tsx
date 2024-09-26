import { Card, Grid, Stack } from '@mui/material';
import React from 'react';

interface Option {
  key: string;
  value: string;
}

interface Specification {
  specKey: string;
  specValue: string;
}

export interface Variant {
  sku: string;
  price: number;
  discountedPrice: number;
  stock: number;
  options: Option[];
  specifications: Specification[];
}

interface Product {
  name: string;
  description: string;
  images: string[];
  brand: string;
  variants: Variant[];
}

interface ProductVariantSelectorProps {
  product: Product;
  selectedVariant: Variant;
  setSelectedVariant: React.Dispatch<React.SetStateAction<Variant>>;
}

const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  product,
  selectedVariant,
  setSelectedVariant,
}) => {
  const handleVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  return (
    <div>
      {/* Variant Selector */}
      <div>
        <h3>Select Variant:</h3>
        <Stack spacing={2}>
          <VariantList
            handleVariantChange={handleVariantChange}
            product={product}
            selectedVariant={selectedVariant}
          />
        </Stack>
      </div>
    </div>
  );
};

const VariantList = ({ product, selectedVariant, handleVariantChange }) => {
  return (
    <Grid container spacing={2}>
      {product.variants.map((variant) => (
        <Grid item xs={12} sm={6} md={4} key={variant.sku}>
          <Card
            onClick={() => handleVariantChange(variant)}
            style={{
              padding: '10px',
              cursor: 'pointer',
              backgroundColor: selectedVariant._id === variant._id ? 'lightblue' : 'white',
            }}
          >
            <div style={{ display: 'flex', gap: '5px' }}>
              {variant.centralizedData.options.map((option, index) => (
                <span key={option.key}>
                  {option.key}: {option.value}
                  {index < variant.centralizedData.options.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductVariantSelector;
