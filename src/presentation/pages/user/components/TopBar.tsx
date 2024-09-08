import React from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const TopBar = () => {
  return (
    <Toolbar
      sx={{
        justifyContent: 'space-between',
        backgroundColor: '#f7f7f7',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        ShopHub
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* Delivery Information */}
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'textSecondary' }}
        >
          <FmdGoodOutlinedIcon fontSize="small" color="userPrimary" />
          Deliver to <strong>423651</strong>
        </Typography>
        {/* Track Order */}
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'textSecondary' }}
        >
          <LocalShippingOutlinedIcon fontSize="small" color="userPrimary" />
          Track your order
        </Typography>
        {/* All Offers */}
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'textSecondary' }}
        >
          <FavoriteBorderOutlinedIcon fontSize="small" color="userPrimary" />
          All Offers
        </Typography>
      </Box>
    </Toolbar>
  );
};

export default TopBar;
