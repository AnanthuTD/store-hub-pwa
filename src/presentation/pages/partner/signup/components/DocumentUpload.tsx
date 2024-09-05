import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SubmitButton from '@/presentation/pages/partner/signup/components/SubmitButton';
import ImageUpload from '@/presentation/pages/partner/signup/components/ImageUpload';

interface DocumentUploadProps {
  documentType: string;
  frontLabel: string;
  backLabel: string;
  onSubmit: (frontImage: string, backImage: string) => void;
  frontUrl: string;
  backUrl: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  documentType,
  frontLabel,
  backLabel,
  onSubmit,
  frontUrl,
  backUrl,
}) => {
  const [frontImage, setFrontImage] = useState<string | null>(frontUrl || null);
  const [backImage, setBackImage] = useState<string | null>(backUrl || null);

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
    <Container
      maxWidth="xs"
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h6" align="center" gutterBottom fontWeight="bold">
          {`${documentType} Details`}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          gutterBottom
          marginBottom={3}
        >
          Upload focused photo of your {documentType} for faster verification
        </Typography>

        <ImageUpload
          label={frontLabel}
          image={frontImage}
          onUpload={(e) => handleUpload(e, setFrontImage)}
        />

        <ImageUpload
          label={backLabel}
          image={backImage}
          onUpload={(e) => handleUpload(e, setBackImage)}
        />
      </Box>
      <Box position={'relative'} bottom={0}>
        <SubmitButton
          text="Submit"
          disabled={!(frontImage && backImage)}
          onClick={() => frontImage && backImage && onSubmit(frontImage, backImage)}
        />
      </Box>
    </Container>
  );
};

export default DocumentUpload;
