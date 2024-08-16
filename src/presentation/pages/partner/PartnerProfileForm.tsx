import React, { useState } from 'react';
import SubmitButton from '@/presentation/components/Partner/Registration/SubmitButton';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

// Define type for form values
type FormValues = {
  firstName: string;
  lastName: string;
  fathersName: string;
  dob: Dayjs | null;
  primaryMobile: string;
  whatsappNumber: string;
  secondaryMobile: string;
  bloodGroup: string;
  city: string;
  address: string;
  referralCode: string;
  profilePicture: File | null;
};

// Define type for InputField props
interface FormInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  optional?: boolean;
}

// Reusable InputField Component
const FormInputField: React.FC<FormInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  optional = false,
}) => (
  <TextField
    variant="outlined"
    label={label}
    placeholder={placeholder}
    fullWidth
    sx={{ my: 2, backgroundColor: '#FFF', borderRadius: 1 }}
    value={value}
    onChange={onChange}
    required={!optional}
  />
);

const UserProfileForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    fathersName: '',
    dob: null,
    primaryMobile: '',
    whatsappNumber: '',
    secondaryMobile: '',
    bloodGroup: '',
    city: '',
    address: '',
    referralCode: '',
    profilePicture: null,
  });

  const handleInputChange = (field: keyof FormValues, value: string | Dayjs | null) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange('profilePicture', file);
  };

  const handleSubmit = () => {
    // Validate form values here
    console.log('Form Values:', formValues);
  };

  return (
    <Box sx={{ padding: 2, width: '100%', maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h5" fontWeight="bold" marginBottom={3}>
        Personal Information
      </Typography>
      <Typography>Enter the details below so we can get to know and serve you better</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormInputField
            label="First Name"
            placeholder="Please enter first name"
            value={formValues.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputField
            label="Last Name"
            placeholder="Please enter last name"
            value={formValues.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputField
            label="Father's Name"
            placeholder="Please enter father's name"
            value={formValues.fathersName}
            onChange={(e) => handleInputChange('fathersName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="Date of birth"
            value={formValues.dob}
            onChange={(date) => handleInputChange('dob', date)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputField
            label="Primary mobile number"
            placeholder="+91 9999988888"
            value={formValues.primaryMobile}
            onChange={(e) => handleInputChange('primaryMobile', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputField
            label="WhatsApp number"
            placeholder="+91 9999988888"
            value={formValues.whatsappNumber}
            onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputField
            label="Secondary mobile number (Optional)"
            placeholder="e.g. 9999999999"
            value={formValues.secondaryMobile}
            onChange={(e) => handleInputChange('secondaryMobile', e.target.value)}
            optional
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputField
            label="Blood Group"
            placeholder="Enter blood group here"
            value={formValues.bloodGroup}
            onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputField
            label="City"
            placeholder="e.g. Bangalore"
            value={formValues.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputField
            label="Enter complete address here"
            placeholder="Search address"
            value={formValues.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{ border: '1px dashed #ccc', padding: 2, textAlign: 'center', cursor: 'pointer' }}
          >
            <Typography sx={{ mb: 1 }}>Your Profile Picture</Typography>
            <Button component="label">
              <img src="/upload-icon.png" alt="upload" style={{ width: '24px', height: '24px' }} />
              <Typography sx={{ ml: 1, color: '#FF6B6B' }}>Upload Photo</Typography>
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FormInputField
            label="Referral code (Optional)"
            placeholder="Enter referral code"
            value={formValues.referralCode}
            onChange={(e) => handleInputChange('referralCode', e.target.value)}
            optional
          />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton text="Submit" onClick={handleSubmit} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfileForm;
