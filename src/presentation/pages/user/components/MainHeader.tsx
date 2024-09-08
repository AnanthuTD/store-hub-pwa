import React from 'react';
import { Box, Toolbar, Typography, IconButton, InputBase, Stack, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';
import axiosInstance from '@/config/axios';
import { logout } from '@/infrastructure/redux/slices/user/userSlice';

const MainHeader = () => {
  const user = useSelector<RootState>((state) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear Redux store
    navigate('/signin'); // Navigate to sign-in page after logout
    axiosInstance.get('/user/auth/logout');
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
