import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import { IShopOwner } from '@/domain/entities/IShopOwner';
import FormTextField from './FormTextField'; // Adjust the path as needed
import { ShopOwnerResponseDTO } from '@/infrastructure/services/ShopOwner/AuthService';

type ShopOwner = Omit<IShopOwner, '_id'>;

interface IShopOwnerFormProps {
  onSubmit: (shopOwner: ShopOwner) => void;
  initialData: ShopOwnerResponseDTO;
}

const ShopOwnerForm: React.FC<IShopOwnerFormProps> = ({ onSubmit, initialData }) => {
  // Initialize state with initialData? and handle null values
  const [firstName, setFirstName] = useState(initialData?.profile?.firstName || '');
  const [lastName, setLastName] = useState(initialData?.profile?.lastName || '');
  const [email, setEmail] = useState(initialData.email);
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [street, setStreet] = useState(initialData?.profile?.address?.street || '');
  const [city, setCity] = useState(initialData?.profile?.address?.city || '');
  const [state, setState] = useState(initialData?.profile?.address?.state || '');
  const [country, setCountry] = useState(initialData?.profile?.address?.country || '');
  const [postalCode, setPostalCode] = useState(initialData?.profile?.address?.postalCode || '');
  const [accountHolderName, setAccountHolderName] = useState(
    initialData?.bankDetails?.accountHolderName || '',
  );
  const [accountNumber, setAccountNumber] = useState(initialData?.bankDetails?.accountNumber || '');
  const [bankName, setBankName] = useState(initialData?.bankDetails?.bankName || '');
  const [ifscCode, setIfscCode] = useState(initialData?.bankDetails?.ifscCode || '');

  // Optional: Handle initialData? changes if props can change during the component's lifecycle
  useEffect(() => {
    setFirstName(initialData?.profile?.firstName || '');
    setLastName(initialData?.profile?.lastName || '');
    setEmail(initialData?.email || '');
    setPhone(initialData?.phone || '');
    setStreet(initialData?.profile?.address?.street || '');
    setCity(initialData?.profile?.address?.city || '');
    setState(initialData?.profile?.address?.state || '');
    setCountry(initialData?.profile?.address?.country || '');
    setPostalCode(initialData?.profile?.address?.postalCode || '');
    setAccountHolderName(initialData?.bankDetails?.accountHolderName || '');
    setAccountNumber(initialData?.bankDetails?.accountNumber || '');
    setBankName(initialData?.bankDetails?.bankName || '');
    setIfscCode(initialData?.bankDetails?.ifscCode || '');
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const shopOwner: ShopOwner = {
      bankDetails: {
        accountHolderName: accountHolderName || null,
        accountNumber: accountNumber || null,
        bankName: bankName || null,
        ifscCode: ifscCode || null,
      },
      createdAt: null, // Assuming this is set on the server
      email: email || null,
      phone: phone || null,
      updatedAt: null, // Assuming this is set on the server
      profile: {
        address: {
          city: city || null,
          country: country || null,
          postalCode: postalCode || null,
          state: state || null,
          street: street || null,
        },
        firstName: firstName || '',
        lastName: lastName || '',
      },
    };
    onSubmit(shopOwner);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, color: 'white' }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormTextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, color: 'white' }}>
        Address Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormTextField
            label="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField label="City" value={city} onChange={(e) => setCity(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField label="State" value={state} onChange={(e) => setState(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            label="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, color: 'white' }}>
        Bank Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormTextField
            label="Account Holder Name"
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            label="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            label="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            label="IFSC Code"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, backgroundColor: '#3B82F6', color: '#ffffff' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ShopOwnerForm;
