import React from 'react';
import { Toolbar, Typography, Stack, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';
import SearchAutocomplete from './SearchAutoComplete'; // Import the new component
import UserMenu from './UserMenu';

const MainHeader = () => {
  return (
    <Toolbar
      sx={{
        justifyContent: 'space-between',
        padding: '10px 15px',
        backgroundColor: 'white',
      }}
    >
      {/* Logo */}
      <Link to={'/home'}>
        <Typography variant="h5" sx={{ color: '#1a202c', fontWeight: 700 }}>
          StoreHub
        </Typography>
      </Link>

      {/* Search Box */}

      <SearchAutocomplete />

      {/* Right Menu */}
      <Stack direction="row" spacing={2} alignItems="center">
        <UserMenu />
        <Link to={'/products/list'}>
          <Button variant="contained">Shop</Button>
        </Link>
        <Link to={'/cart'}>
          <IconButton>
            <ShoppingCartIcon color="action" />
          </IconButton>
        </Link>
        <IconButton>
          <FavoriteBorderOutlinedIcon color="action" />
        </IconButton>
      </Stack>
    </Toolbar>
  );
};

export default MainHeader;
