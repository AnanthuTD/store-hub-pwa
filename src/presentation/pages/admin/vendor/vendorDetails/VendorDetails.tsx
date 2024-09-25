// ShopOwnerDetails.tsx
import React from 'react';
import { Grid, Typography, Avatar } from '@mui/material';
import { IVendor } from '@/domain/entities/IVendor';

interface ShopOwnerDetailsProps {
  shopOwnerData: IVendor;
}

const ShopOwnerDetails: React.FC<ShopOwnerDetailsProps> = ({ shopOwnerData }) => {
  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1">Email: {shopOwnerData.email}</Typography>
        <Typography variant="subtitle1">Phone: {shopOwnerData.phone}</Typography>
        <Typography variant="subtitle1">City: {shopOwnerData.profile?.address.city}</Typography>
        <Typography variant="subtitle1">
          Address: {shopOwnerData.profile?.address.street}
        </Typography>
        <Typography variant="subtitle1">
          Account Verified: {shopOwnerData.isVerified ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="subtitle1">
          Email Verified: {shopOwnerData.emailVerified ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="subtitle1">
          Created At: {new Date(shopOwnerData.createdAt ?? '').toLocaleString()}
        </Typography>
        <Typography variant="subtitle1">
          Updated At: {new Date(shopOwnerData.updatedAt ?? '').toLocaleString()}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Avatar
          src={shopOwnerData.profile?.avatar}
          alt={`${shopOwnerData.profile?.firstName} Avatar`}
          sx={{ width: 100, height: 100, marginY: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default ShopOwnerDetails;
