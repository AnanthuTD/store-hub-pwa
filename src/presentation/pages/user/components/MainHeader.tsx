import React, { useState } from 'react';
import { Box, Toolbar, Typography, IconButton, InputBase, Stack, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';
import axiosInstance from '@/config/axios';
import { logout } from '@/infrastructure/redux/slices/user/userSlice';

const MainHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const user = useSelector<RootState>((state) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear Redux store
    navigate('/signin'); // Navigate to sign-in page after logout
    axiosInstance.get('/user/auth/logout');
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products/list?query=${encodeURIComponent(searchQuery)}`);
    }
  };

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
        component="form"
        onSubmit={handleSearch}
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
        <SearchIcon color="action" />
        <InputBase
          placeholder="Search essentials, groceries, and more..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ ml: 1, flex: 1, color: '#6e7a84' }}
        />
        <IconButton type="submit" sx={{ p: 1 }}>
          <SearchIcon color="action" />
        </IconButton>
      </Box>

      {/* Right Menu */}
      <Stack direction="row" spacing={2} alignItems="center">
        {user ? (
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to="/signin" style={{ textDecoration: 'none', color: '#23A6F0' }}>
            Login / Register
          </Link>
        )}
        <IconButton>
          <LocalMallOutlinedIcon color="action" />
        </IconButton>
        <IconButton>
          <FavoriteBorderOutlinedIcon color="action" />
        </IconButton>
      </Stack>
    </Toolbar>
  );
};

export default MainHeader;
