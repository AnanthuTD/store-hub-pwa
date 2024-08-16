import { Box } from '@mui/material';

const AuthIllustration = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }} height={'50%'}>
      <img
        src="/partner-registration-signin.svg"
        alt="Delivery Illustration"
        style={{ width: '100%', maxWidth: 300 }}
      />
    </Box>
  );
};

export default AuthIllustration;
