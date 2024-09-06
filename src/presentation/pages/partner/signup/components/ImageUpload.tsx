import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface ImageUploadProps {
  label: string;
  image?: string | null;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, image, onUpload }) => {
  return (
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
      flexDirection="column"
    >
      {image && (
        <Box
          component="img"
          src={image}
          alt="Uploaded Image"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '8px',
          }}
        />
      )}

      <Typography marginBottom={3} maxWidth="75%" textAlign="center">
        {label}
      </Typography>
      <Button variant="outlined" component="label">
        <PhotoCamera />
        <Typography sx={{ ml: 1, color: '#FF6B6B' }}>Upload Photo</Typography>
        <input accept="image/*" style={{ display: 'none' }} type="file" onChange={onUpload} />
      </Button>
    </Box>
  );
};

export default ImageUpload;
