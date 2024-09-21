import React from 'react';
import { Toolbar, Typography, Stack, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';
import { logout } from '@/infrastructure/redux/slices/user/userSlice';
import SearchAutocomplete from './SearchAutoComplete'; // Import the new component
import axiosInstance from '@/config/axios';

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

      <SearchAutocomplete />

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
