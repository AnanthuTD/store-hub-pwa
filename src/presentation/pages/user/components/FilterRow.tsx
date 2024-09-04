import React, { useState, MouseEvent } from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Define possible views as a union type
type View = 'grid' | 'list';

// Define sort options type
type SortOption = 'Popularity' | 'Price: Low to High' | 'Price: High to Low' | 'Rating';

const FilterRow: React.FC = () => {
  const [view, setView] = useState<View>('grid'); // State for view toggle
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for menu dropdown
  const [sortOption, setSortOption] = useState<SortOption>('Popularity'); // State for selected sort option

  // Handle view change
  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: View | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  // Handle dropdown menu open
  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle dropdown menu close
  const handleMenuClose = (option?: SortOption) => {
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
      <Box display={'flex'} alignItems="center">
        <Typography variant="body1" color="textSecondary" mr={1}>
          Views:
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="View toggle"
        >
          <ToggleButton value="grid" aria-label="Grid view">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="List view">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
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
          <MenuItem onClick={() => handleMenuClose('Popularity')}>Popularity</MenuItem>
          <MenuItem onClick={() => handleMenuClose('Price: Low to High')}>
            Price: Low to High
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose('Price: High to Low')}>
            Price: High to Low
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose('Rating')}>Rating</MenuItem>
        </Menu>
        <Button variant="contained" color="primary" sx={{ marginLeft: '16px' }}>
          Filter
        </Button>
      </Box>
    </Box>
  );
};

export default FilterRow;
