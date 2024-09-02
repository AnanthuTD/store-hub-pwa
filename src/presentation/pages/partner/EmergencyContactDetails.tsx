import React, { useState } from 'react';
import { Container, Typography, TextField, Grid, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { storePartner } from '@/infrastructure/redux/slices/partner/partnerSlice';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { IDeliveryPartner } from '@/domain/entities/DeliveryPartner';

const EmergencyContactDetails: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const partnerDocs = useSelector<RootState, IDeliveryPartner['documents'] | undefined>(
    (state) => state.partner.data?.documents,
  );
  const partnerDetails = useSelector<RootState>((state) => state.partner.data);

  const handleSubmit = () => {
    // Dispatch the data or perform any necessary actions
    console.log({
      name,
      relationship,
      phone,
    });

    const newData = {
      name,
      relationship,
      phone,
    };

    dispatch(
      storePartner({ ...partnerDetails, documents: { ...partnerDocs, emergencyContact: newData } }),
    );
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Box>
        <Link to={'/partner/signup/document'}>
          <KeyboardArrowLeftIcon />
        </Link>
      </Box>
      <Typography variant="h6" gutterBottom marginBottom={3} fontWeight="bold">
        Emergency Contact Details
      </Typography>
      <Typography gutterBottom marginBottom={3}>
        Please provide the contact details of a person we can reach in case of an emergency.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Contact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Relationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            type="tel"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!name || !relationship || !phone}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default EmergencyContactDetails;
