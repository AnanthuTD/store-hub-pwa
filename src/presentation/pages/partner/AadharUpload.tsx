import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SubmitButton from '@/presentation/components/Partner/Registration/SubmitButton';
import ImageUpload from '@/presentation/components/Partner/Registration/ImageUpload';

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
        <Typography variant="h6" align="center" gutterBottom fontWeight="bold">
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

        <ImageUpload
          label="Front side photo of your Aadhar card with your clear name and photo"
          image={aadhar1}
          onUpload={(e) => handleUpload(e, setAadhar1)}
        />

        <ImageUpload
          label="Back side photo of your Aadhar card with your clear address"
          image={aadhar2}
          onUpload={(e) => handleUpload(e, setAadhar2)}
        />

        <SubmitButton text="Submit" />
      </Box>
    </Container>
  );
};

export default AadharCardUpload;
