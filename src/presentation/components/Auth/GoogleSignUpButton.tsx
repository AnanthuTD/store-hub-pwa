import { Button, Link } from '@mui/material';

const GoogleSignUpButton = () => {
  return (
    <Link href={`${import.meta.env.VITE_API_BASE_URL}/user/auth/google`}>
      <Button
        variant="outlined"
        startIcon={<img src={'/google-logo.svg'} />}
        sx={{
          backgroundColor: '505ABB',
          borderRadius: '50px',
          padding: '10px 20px',
          borderColor: 'rgba(0, 0, 0, 0.2)',
          textTransform: 'none',
          fontWeight: 'normal',
          color: 'black',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.4)',
          },
        }}
        fullWidth
      >
        Sign up with your Google account
      </Button>
    </Link>
  );
};

export default GoogleSignUpButton;
