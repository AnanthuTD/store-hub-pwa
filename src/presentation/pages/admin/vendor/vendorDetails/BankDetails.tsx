// BankDetails.tsx
import React from 'react';
import { Paper, Typography, Divider } from '@mui/material';
import { IVendor } from '@/domain/entities/IVendor';

interface BankDetailsProps {
  bankDetails: IVendor['bankDetails'];
}

const BankDetails: React.FC<BankDetailsProps> = ({ bankDetails }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginY: 2 }}>
      <Typography variant="h6">Bank Details</Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography variant="subtitle1">
        Account Holder Name: {bankDetails?.accountHolderName}
      </Typography>
      <Typography variant="subtitle1">Account Number: {bankDetails?.accountNumber}</Typography>
      <Typography variant="subtitle1">Bank Name: {bankDetails?.bankName}</Typography>
      <Typography variant="subtitle1">IFSC Code: {bankDetails?.ifscCode}</Typography>
    </Paper>
  );
};

export default BankDetails;
