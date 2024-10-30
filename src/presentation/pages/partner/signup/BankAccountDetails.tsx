import React, { useState } from 'react';
import { Container, Typography, TextField, Grid, Button, Box } from '@mui/material';
import { storePartner } from '@/infrastructure/redux/slices/partner/partnerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { IDeliveryPartner } from '@/domain/entities/DeliveryPartner';
import { message } from 'antd';

const BankAccountDetails: React.FC = () => {
  const navigate = useNavigate();
  const [accountHolderName, setAccountHolderName] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState<string>('');
  const [ifscCode, setIfscCode] = useState<string>('');
  // const [proofOfBank, setProofOfBank] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const partnerDocs = useSelector<RootState, IDeliveryPartner['documents'] | undefined>(
    (state) => state.partner.data?.documents,
  );
  const partnerDetails = useSelector<RootState>((state) => state.partner.data);

  /* const handleDocumentUpload = (frontImage: string | null) => {
    setProofOfBank(frontImage);
  }; */

  const handleSubmit = () => {
    if (accountNumber !== confirmAccountNumber) {
      message.error("Account numbers don't match!");
      return;
    }

    // Dispatch the data or perform any necessary actions
    console.log({
      accountHolderName,
      bankName,
      accountNumber,
      ifscCode,
      // proofOfBank,
    });

    const bankDetails = {
      accountHolderName,
      bankName,
      accountNumber,
      ifscCode,
      // proofOfBank,
    };

    dispatch(
      storePartner({
        ...partnerDetails,
        documents: { ...partnerDocs, bankAccountDetails: bankDetails },
      }),
    );

    navigate('/partner/signup/document');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Box>
        <Link to={'/partner/signup/document'}>
          <KeyboardArrowLeftIcon />
        </Link>
      </Box>
      <Typography variant="h6" gutterBottom marginBottom={3} fontWeight="bold">
        Bank Account Details
      </Typography>
      <Typography gutterBottom marginBottom={3}>
        Please enter your bank details for payment processing.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Account Holder Name"
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm Account Number"
            value={confirmAccountNumber}
            onChange={(e) => setConfirmAccountNumber(e.target.value)}
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="IFSC Code"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Link to={'/partner/signup/document'} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={
              !accountHolderName ||
              !bankName ||
              !accountNumber ||
              !ifscCode ||
              accountNumber !== confirmAccountNumber
            }
          >
            Submit
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default BankAccountDetails;
