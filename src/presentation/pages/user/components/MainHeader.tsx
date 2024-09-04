import React from 'react';
import { Box, Toolbar, Typography, IconButton, InputBase, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

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
      <Typography variant="h5" sx={{ color: '#1a202c', fontWeight: 700 }}>
        StoreHub
      </Typography>

      {/* Search Box */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f1f8fc',
          borderRadius: '20px',
          padding: '5px 15px',
          width: '50%',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <SearchIcon color="userPrimary" />
        <InputBase
          placeholder="Search essentials, groceries and more..."
          sx={{ ml: 1, flex: 1, color: '#6e7a84' }}
        />
        <MenuIcon color="userPrimary" />
      </Box>

      {/* Right Menu */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Link to="#" style={{ textDecoration: 'none', color: '#23A6F0' }}>
          Login / Register
        </Link>
        <IconButton>
          <LocalMallOutlinedIcon color="userPrimary" />
        </IconButton>
        <IconButton>
          <FavoriteBorderOutlinedIcon color="userPrimary" />
        </IconButton>
      </Stack>
    </Toolbar>
  );
};

export default MainHeader;
