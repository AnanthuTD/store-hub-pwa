import React from 'react';
import { Box, Skeleton } from '@mui/material';

const ProductCardSkeleton = () => (
  <Box p={2} display="flex" flexDirection="column" alignItems="center" width={200}>
    <Skeleton variant="rectangular" width={200} height={200} />
    <Box mt={2}>
      <Skeleton width={150} />
      <Skeleton width={100} />
    </Box>
  </Box>
);

export default ProductCardSkeleton;
