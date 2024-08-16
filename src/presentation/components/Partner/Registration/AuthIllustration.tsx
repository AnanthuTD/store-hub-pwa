import { Box } from '@mui/material';

const AuthIllustration = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }} height={'45%'}>
      <img
        src="your-illustration-url"
        alt="Delivery Illustration"
        style={{ width: '100%', maxWidth: 300 }}
      />
    </Box>
  );
};

export default AuthIllustration;
