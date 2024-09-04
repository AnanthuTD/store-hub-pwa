import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';

// Props for Pagination Component
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(_, page) => onPageChange(page)}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          // variant={item.page === currentPage ? 'contained' : 'text'}
          color={item.page === currentPage ? 'userPrimary' : 'standard'} // Corrected color usage
        />
      )}
      sx={{ marginTop: 2 }}
    />
  );
};

export default CustomPagination;
