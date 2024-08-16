import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SubmitButton from '@/presentation/components/Partner/Registration/SubmitButton';

const AadharCardUpload: React.FC = () => {
  const [aadhar1, setAadhar1] = useState<string | null>(null);
  const [aadhar2, setAadhar2] = useState<string | null>(null);

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h6" align="center" gutterBottom fontWeight={'bold'}>
          Aadhar card details
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          gutterBottom
          marginBottom={3}
        >
          Upload focused photo of your Aadhar Card for faster verification
        </Typography>

        <Box
          border="1px dashed"
          borderRadius="8px"
          width="100%"
          height="200px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          mb={2}
          sx={{ backgroundColor: '#f7f7f7' }}
          flexDirection={'column'}
        >
          {aadhar1 && (
            <Box
              component="img"
              src={aadhar1}
              alt="Aadhar Front"
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          )}

          <Typography marginBottom={3} maxWidth={'75%'} textAlign={'center'}>
            Front side photo of your Aadhar card with your clear name and photo
          </Typography>
          <Button variant="outlined" component="label">
            <PhotoCamera />
            <Typography sx={{ ml: 1, color: '#FF6B6B' }}>Upload Photo</Typography>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-aadhar1"
              type="file"
              onChange={(e) => handleUpload(e, setAadhar1)}
            />
          </Button>
        </Box>

        {/* Second upload section */}
        <Box
          border="1px dashed"
          borderRadius="8px"
          width="100%"
          height="200px"
          display="flex"
          flexDirection={'column'}
          justifyContent="center"
          alignItems="center"
          position="relative"
          mb={4}
          sx={{ backgroundColor: '#f7f7f7' }}
        >
          {aadhar2 && (
            <Box
              component="img"
              src={aadhar2}
              alt="Aadhar Front"
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          )}
          <Typography marginBottom={3} maxWidth={'75%'} textAlign={'center'}>
            Front side photo of your Aadhar card with your clear name and photo
          </Typography>
          <Button variant="outlined" component="label">
            <PhotoCamera />
            <Typography sx={{ ml: 1, color: '#FF6B6B' }}>Upload Photo</Typography>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-aadhar2"
              type="file"
              onChange={(e) => handleUpload(e, setAadhar2)}
            />
          </Button>
        </Box>

        <SubmitButton text="Submit" />
      </Box>
    </Container>
  );
};

export default AadharCardUpload;
