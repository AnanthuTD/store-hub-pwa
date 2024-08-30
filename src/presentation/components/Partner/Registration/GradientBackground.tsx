import { Box } from '@mui/material';

const SvgBackground = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '-15%',
        left: 0,
        width: '100%',
        height: '80%',
        background: `url('/partner-registration-gradiant.svg') no-repeat center top`,
        backgroundSize: 'cover',
        zIndex: -1,
      }}
    />
  );
};

export default SvgBackground;
