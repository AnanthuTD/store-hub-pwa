import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { storePartner } from '@/infrastructure/redux/slices/partner/partnerSlice';
import ImageUpload from '@/presentation/pages/partner/signup/components/ImageUpload';
import SubmitButton from '@/presentation/pages/partner/signup/components/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

// Define type for form values
type FormValues = {
  firstName: string;
  lastName: string;
  dob: Dayjs | null;
  primaryMobile: string;
  bloodGroup: string;
  city: string;
  address: string;
  referralCode?: string; // Make referralCode optional
  avatar: string | null;
};

const isAtLeast18YearsOld = (dob: Dayjs | null): boolean => {
  if (!dob) return false;
  const today = dayjs();
  const eighteenYearsAgo = today.subtract(18, 'year');
  return dob.isBefore(eighteenYearsAgo);
};

const UserProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const partnerDetails = useSelector<RootState>((state) => state.partner.data);

  // Initialize react-hook-form with validation rules
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: null,
      primaryMobile: '',
      bloodGroup: '',
      city: '',
      address: '',
      referralCode: '',
      avatar: null,
    },
    mode: 'onBlur', // Trigger validation on field blur
    criteriaMode: 'all', // Validate all criteria
  });

  // Handle file upload and set avatar URL
  const handleUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setValue('avatar', URL.createObjectURL(file));
      }
    },
    [setValue],
  );

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log(data);

    if (!data.avatar) {
      message.warning('Please select a profile picture');
      return;
    } else if (!data.dob) {
      message.warning('Please select a date of birth');
      return;
    }
    console.log('Form Values:', data);
    dispatch(storePartner({ _id: partnerDetails._id, ...data }));
    navigate('/partner/signup/document');
  };

  return (
    <Box sx={{ padding: 2, width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h5" fontWeight="bold" marginBottom={3}>
        Personal Information
      </Typography>
      <Typography variant="body1" marginBottom={2}>
        Enter the details below so we can get to know and serve you better.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="First Name"
                placeholder="Please enter first name"
                fullWidth
                sx={{ my: 2, backgroundColor: '#FFF', borderRadius: 1 }}
                {...field}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Last Name"
                placeholder="Please enter last name"
                fullWidth
                sx={{ my: 2, backgroundColor: '#FFF', borderRadius: 1 }}
                {...field}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="dob"
            control={control}
            rules={{
              required: 'Date of birth is required',
              validate: {
                isAtLeast18YearsOld: (value) =>
                  isAtLeast18YearsOld(value) || 'You must be at least 18 years old',
              },
            }}
            render={({ field }) => (
              <>
                <DatePicker
                  label="Date of Birth"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                />
                <p style={{ color: '#d32f2f', fontSize: '0.75rem' }}>{errors.dob?.message}</p>
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="primaryMobile"
            control={control}
            rules={{
              required: 'Primary mobile number is required',
              pattern: {
                value: /^[+]?[0-9]{10,15}$/,
                message: 'Enter a valid mobile number',
              },
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Primary Mobile Number"
                placeholder="+91 9999988888"
                fullWidth
                sx={{ my: 2, backgroundColor: '#FFF', borderRadius: 1 }}
                {...field}
                error={!!errors.primaryMobile}
                helperText={errors.primaryMobile?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="bloodGroup"
            control={control}
            rules={{
              required: 'Blood Group number is required',
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Blood Group"
                placeholder="Enter blood group here"
                fullWidth
                sx={{ my: 2, backgroundColor: '#FFF', borderRadius: 1 }}
                {...field}
                error={!!errors.bloodGroup}
                helperText={errors.bloodGroup?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="city"
            control={control}
            rules={{
              required: 'City is required',
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="City"
                placeholder="e.g. Bangalore"
                fullWidth
                sx={{ my: 2, backgroundColor: '#FFF', borderRadius: 1 }}
                {...field}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="address"
            control={control}
            rules={{
              required: 'Address is required',
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Address"
                placeholder="Enter complete address here"
                fullWidth
                sx={{ my: 2, backgroundColor: '#FFF', borderRadius: 1 }}
                {...field}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="avatar"
            control={control}
            rules={{
              required: 'Avatar is required',
            }}
            render={({ field }) => (
              <>
                <ImageUpload
                  image={field.value} // Watch for the avatar value
                  label="Upload Profile Image"
                  onUpload={handleUpload}
                />
                <p style={{ color: '#d32f2f', fontSize: '0.75rem' }}>{errors.avatar?.message}</p>
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="referralCode"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Referral Code (Optional)"
                placeholder="Enter referral code"
                fullWidth
                sx={{ my: 2, backgroundColor: '#FFF', borderRadius: 1 }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton text="Submit" onClick={handleSubmit(onSubmit)} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfileForm;
