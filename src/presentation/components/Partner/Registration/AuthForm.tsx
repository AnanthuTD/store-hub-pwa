import { Box, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const AuthForm = () => {
  return (
    <Box
      flex={'1'}
      position={'relative'}
      display={'flex'}
      justifyContent={'space-between'}
      flexDirection={'column'}
      paddingBottom={'25%'}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          Be a StoreHub Partner
        </Typography>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Get a stable monthly income
        </Typography>
      </Box>

      <Box>
        <InputField label="Enter Mobile Number" placeholder="e.g. 9999988888" />

        <FormControlLabel
          control={<Checkbox color="primary" />}
          label={
            <>
              By signing up I agree to the{' '}
              <Link href="#" underline="always">
                Terms of use
              </Link>{' '}
              and{' '}
              <Link href="#" underline="always">
                Privacy Policy
              </Link>
              .
            </>
          }
          sx={{ mb: 2 }}
        />

        <SubmitButton text="Send OTP" />
      </Box>
    </Box>
  );
};

export default AuthForm;
