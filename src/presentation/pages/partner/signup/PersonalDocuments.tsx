import React, { useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import DocumentUpload from '@/presentation/pages/partner/signup/components/DocumentUpload';
import DocumentItem from '@/presentation/pages/partner/signup/components/DocumentItem';
import { useDispatch, useSelector } from 'react-redux';
import { storePartner } from '@/infrastructure/redux/slices/partner/partnerSlice';
import { IDeliveryPartner } from '@/domain/entities/DeliveryPartner';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Link } from 'react-router-dom';

interface PersonalDoc {
  title: string;
  type: keyof IDeliveryPartner['documents'];
}

const PersonalDocs: PersonalDoc[] = [
  { title: 'Aadhar Card', type: 'aadhar' },
  { title: 'PAN Card', type: 'pan' },
  { title: 'Driving License', type: 'drivingLicense' },
];

const PersonalDocuments: React.FC = () => {
  const partnerDetails = useSelector<RootState>((state) => state.partner.data);
  const dispatch = useDispatch<AppDispatch>();

  const partnerDocs = useSelector<RootState, IDeliveryPartner['documents'] | undefined>(
    (state) => state.partner.data?.documents,
  );

  const [selectedDocument, setSelectedDocument] = useState<PersonalDoc['type'] | null>(null);

  const handleCardClick = (documentType: PersonalDoc['type']) => {
    setSelectedDocument(documentType);
  };

  const handleDocumentUpload = (
    documentType: PersonalDoc['type'],
    frontImage: string | null,
    backImage: string | null,
  ) => {
    const updatedDocs = {
      ...partnerDocs,
      [documentType]: { frontImage, backImage },
    };

    dispatch(storePartner({ ...partnerDetails, documents: updatedDocs }));

    setSelectedDocument(null); // Hide the upload component after submission
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4, pb: 8 }}>
      {' '}
      {/* Added padding at the bottom */}
      <Box>
        <Link to={'/partner/signup/document'}>
          <KeyboardArrowLeftIcon />
        </Link>
      </Box>
      <Typography variant="h6" gutterBottom marginBottom={3} fontWeight="bold">
        Personal Documents
      </Typography>
      <Typography gutterBottom marginBottom={3}>
        Upload focused photos of the documents below for faster verification
      </Typography>
      <Grid container spacing={2}>
        {PersonalDocs.map(({ title, type }) => (
          <Grid item xs={12} key={title}>
            <Box onClick={() => handleCardClick(type)}>
              <DocumentItem title={title} completed={!!partnerDocs?.[type]?.frontImage} />
            </Box>
            {selectedDocument === type && (
              <Box mt={2}>
                <DocumentUpload
                  key={type}
                  documentType={title}
                  frontLabel={`Front side photo of your ${title}`}
                  backLabel={`Back side photo of your ${title}`}
                  onSubmit={(frontImage, backImage) =>
                    handleDocumentUpload(type, frontImage, backImage)
                  }
                  frontUrl={partnerDocs?.[type]?.frontImage}
                  backUrl={partnerDocs?.[type]?.backImage}
                />
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
      {/*  <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translate X(-50%)',
          width: '100%',
          maxWidth: 'xs',
          px: 2,
        }}
      >
        <Button variant="contained" color="primary" fullWidth hidden={true}>
          Submit
        </Button>
      </Box> */}
    </Container>
  );
};

export default PersonalDocuments;
