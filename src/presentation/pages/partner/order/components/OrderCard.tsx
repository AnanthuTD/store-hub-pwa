import React from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Order } from './Card';

const OrderCard = ({ order }: { order: Order }): JSX.Element => {
  return (
    <Box
      sx={{
        width: 348,
        paddingInline: 2,
        paddingTop: 2,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="body1" color="textPrimary">
            Order No.
          </Typography>
          <Typography variant="caption" color="textPrimary">
            #{order.id}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Chip label="Delivered" color="success" variant="outlined" />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton size="small">
          <ArrowDropDownIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default OrderCard;
