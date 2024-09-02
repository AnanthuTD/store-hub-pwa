import React, { useState } from 'react';
import { Container, Typography, TextField, Grid, Button, Box, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { storePartner } from '@/infrastructure/redux/slices/partner/partnerSlice';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { IDeliveryPartner } from '@/domain/entities/DeliveryPartner';

const vehicleTypes = ['Bike', 'Car', 'Scooter', 'Van'];

const VehicleInformation: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<string>('');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [registrationNumber, setRegistrationNumber] = useState<string>('');
  const [registrationYear, setRegistrationYear] = useState<string>('');
  // const [rcFront, setRcFront] = useState<string | null>(null);
  // const [insuranceFront, setInsuranceFront] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const partnerDocs = useSelector<RootState, IDeliveryPartner['documents'] | undefined>(
    (state) => state.partner.data?.documents,
  );
  const partnerDetails = useSelector<RootState>((state) => state.partner.data);

  /* const partnerDocs = useSelector<RootState, IDeliveryPartner['documents'] | undefined>(
    (state) => state.partner.data?.documents,
  ); */

  /*  const handleDocumentUpload = (type: 'rc' | 'insurance', frontImage: string | null) => {
    if (type === 'rc') {
      setRcFront(frontImage);
    } else {
      setInsuranceFront(frontImage);
    }
  }; */

  const handleSubmit = () => {
    // Dispatch the data or perform any necessary actions
    console.log({
      vehicleType,
      vehicleModel,
      registrationNumber,
      registrationYear,
      // rcFront,
      // insuranceFront,
    });

    const newData = {
      vehicleType,
      vehicleModel,
      registrationNumber,
      registrationYear,
      // rcFront,
      // insuranceFront,
    };

    dispatch(storePartner({ ...partnerDetails, documents: { ...partnerDocs, vehicle: newData } }));
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Box>
        <Link to={'/partner/signup/document'}>
          <KeyboardArrowLeftIcon />
        </Link>
      </Box>
      <Typography variant="h6" gutterBottom marginBottom={3} fontWeight="bold">
        Vehicle Information
      </Typography>
      <Typography gutterBottom marginBottom={3}>
        Please enter your vehicle details and upload the required documents.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Vehicle Type"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            variant="outlined"
          >
            {vehicleTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Vehicle Model"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Registration Number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Year of Registration"
            value={registrationYear}
            onChange={(e) => setRegistrationYear(e.target.value)}
            variant="outlined"
          />
        </Grid>

        {/*  <Grid item xs={12}>
          <DocumentUpload
            documentType="RC"
            frontLabel="Upload Front Side of RC"
            onSubmit={(frontImage) => handleDocumentUpload('rc', frontImage)}

          />
        </Grid>
        <Grid item xs={12}>
          <DocumentUpload
            documentType="Insurance"
            frontLabel="Upload Insurance Document"
            onSubmit={(frontImage) => handleDocumentUpload('insurance', frontImage)}
          />
        </Grid> */}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!vehicleType || !vehicleModel || !registrationNumber}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default VehicleInformation;
