import React, { useState, MouseEvent } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type { SortOption } from '../productsList';

interface FilterRowProps {
  sortOption: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
}

const FilterRow: React.FC<FilterRowProps> = ({ sortOption, setSortOption }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for menu dropdown

  // Handle dropdown menu open
  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle dropdown menu close
  const handleMenuClose = (option?: SortOption) => {
    console.log(option);

    if (option) {
      setSortOption(option);
    }
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" py={2}>
      <Typography variant="body1" color="textSecondary">
        Showing all 12 results
      </Typography>
      <Box display="flex" alignItems="center">
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleMenuClick}
          endIcon={<ArrowDropDownIcon />}
          sx={{ marginLeft: '16px' }}
        >
          {sortOption}
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenuClose()}>
          <MenuItem onClick={() => handleMenuClose('popularity')}>Popularity</MenuItem>
          <MenuItem onClick={() => handleMenuClose('price_asc')}>Price: Low to High</MenuItem>
          <MenuItem onClick={() => handleMenuClose('price_desc')}>Price: High to Low</MenuItem>
          <MenuItem onClick={() => handleMenuClose('rating')}>Rating</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default FilterRow;
