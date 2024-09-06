import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDownwardIosIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import axiosInstance from '@/config/axios';
import DocumentUpload from './components/DocumentUpload';

type Status = 'approved' | 'rejected' | 'pending';

interface DocumentStatus {
  aadhar: Status;
  drivingLicense: Status;
  pan: Status;
  vehicle: Status;
  emergencyContact: Status;
  bankAccountDetails: Status;
}

const RegistrationComplete = () => {
  const navigate = useNavigate();
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus | null>(null);
  const [partnerDocs, setPartnerDocs] = useState<{
    [key: string]: { frontImage: string | null; backImage: string | null };
  }>({});
  const [selectedDocument, setSelectedDocument] = useState('');

  const handleCardClick = (documentType: string) => {
    setSelectedDocument(documentType);
  };

  useEffect(() => {
    // Fetch data from API on page load
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/partner/document/status'); // Replace with your API endpoint
        const data = response.data;

        if (!data || Object.keys(data).length === 0) {
          // If no data is provided by the API, navigate to '/signup'
          navigate('/partner/signup');
        } else {
          // Update your component state with the fetched data
          setDocumentStatus(data?.documentStatus || null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/partner/signup'); // Navigate to '/signup' on error
      }
    };

    fetchData();
  }, [navigate]);

  // Function to determine the status text and color
  const getStatusInfo = (status: Status) => {
    switch (status) {
      case 'approved':
        return { statusText: 'Approved', color: 'green' };
      case 'rejected':
        return { statusText: 'Rejected', color: 'red' };
      case 'pending':
      default:
        return { statusText: 'Verification Pending', color: 'orange' };
    }
  };

  const handleDocumentUpload = async (
    documentType: string,
    frontImage: Blob | null,
    backImage: Blob | null,
  ) => {
    const formData = new FormData();

    // If frontImage is provided, convert to a file and append to FormData
    if (frontImage) {
      const frontFile = new File([frontImage], `${documentType}_front.jpg`, {
        type: frontImage.type || 'image/jpeg',
      });
      formData.append(`${documentType}_front`, frontFile);
    }

    // If backImage is provided, convert to a file and append to FormData
    if (backImage) {
      const backFile = new File([backImage], `${documentType}_back.jpg`, {
        type: backImage.type || 'image/jpeg',
      });
      formData.append(`${documentType}_back`, backFile);
    }

    // Add any other necessary data to the formData, if needed
    // formData.append('someOtherData', someValue);

    try {
      console.log('Uploading...', formData);

      const response = await axiosInstance.post('/partner/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Uploaded successfully:', response.data);

      // Update partnerDocs state after successful upload if needed
      setPartnerDocs((prev) => ({
        ...prev,
        [documentType]: {
          frontImage,
          backImage,
        },
      }));

      setDocumentStatus((partnerDocs) => ({ ...partnerDocs, ...{ [documentType]: 'pending' } }));
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: '#FF5963' }}>
        <Box
          display={'flex'}
          bgcolor={'white'}
          width={'100%'}
          padding={2}
          sx={{ borderBottomRightRadius: '15px', borderBottomLeftRadius: '15px' }}
        >
          <Link to={'/partner/signup/document'}>
            <ArrowBackIosIcon />
          </Link>
          <Typography variant="h6">Registration Complete</Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} padding={2}>
          <Box>
            <Typography variant="h6" component="div" color={'white'}>
              Your application is under Verification
            </Typography>
            <Typography color={'white'} variant="body2">
              Account will get activated in 48hrs
            </Typography>
          </Box>
          <Box
            component="img"
            src="/verification.svg"
            alt="Verification"
            sx={{ width: 94, height: 91.76, marginLeft: 'auto' }}
          />
        </Box>
      </Box>
      <Box padding={2}>
        <Box sx={{ mt: 3 }}>
          {documentStatus && (
            <>
              {[
                { label: 'Aadhar', key: 'aadhar' },
                { label: 'Driving License', key: 'drivingLicense' },
                { label: 'PAN', key: 'pan' },
                { label: 'Vehicle Details', key: 'vehicle' },
                { label: 'Bank Account Details', key: 'bankAccountDetails' },
                { label: 'Emergency Contact', key: 'emergencyContact' },
              ].map((item, index) => {
                const statusInfo = getStatusInfo(documentStatus[item.key as keyof DocumentStatus]);
                return (
                  <Grid item xs={12} key={item.key}>
                    <Card
                      key={index}
                      sx={{
                        mb: 2,
                        boxShadow: 1,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onClick={() => handleCardClick(item.key)}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="body1">{item.label}</Typography>
                        <Typography variant="body2" sx={{ color: statusInfo.color }}>
                          {statusInfo.statusText}
                        </Typography>
                      </CardContent>
                      {selectedDocument === item.key ? (
                        <ArrowDownwardIosIcon />
                      ) : (
                        <ArrowForwardIosIcon />
                      )}
                    </Card>
                    {selectedDocument === item.key && (
                      <Box mt={2}>
                        <DocumentUpload
                          key={item.key}
                          documentType={item.key}
                          frontLabel={`Front side photo of your ${item.label}`}
                          backLabel={`Back side photo of your ${item.label}`}
                          onSubmit={(frontImage, backImage) =>
                            handleDocumentUpload(item.key, frontImage, backImage)
                          }
                          frontUrl={partnerDocs?.[item.key]?.frontImage || ''}
                          backUrl={partnerDocs?.[item.key]?.backImage || ''}
                        />
                      </Box>
                    )}
                  </Grid>
                );
              })}
            </>
          )}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2">Need Help?</Typography>
          <Button variant="text" color="error">
            Contact Us
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrationComplete;
