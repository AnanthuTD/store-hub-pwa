import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Paper,
  Avatar,
  Divider,
  Dialog,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import axiosInstance from '@/config/axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface PartnerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  bloodGroup: string;
  dob: string;
  isVerified: boolean;
  availability: {
    idAvailable: boolean;
    lastUpdate: string;
  };
  ratings: {
    averageRating: number;
    reviewCount: number;
  };
  avatar: string;
  createdAt: string;
  updatedAt: string;
  documents: { [key: string]: DocumentData };
}

interface DocumentData {
  status: 'approved' | 'rejected';
  [key: string]: any;
}

const AdminValidationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);
  const [message, setMessage] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [documentStatus, setDocumentStatus] = useState<{ [key: string]: 'approved' | 'rejected' }>(
    {},
  );

  const deliveryPartnerId = searchParams.get('id');

  // Fetch delivery partner data on component mount
  useEffect(() => {
    const fetchDeliveryPartnerData = async () => {
      try {
        const response = await axiosInstance.get(`/admin/partner/${deliveryPartnerId}`);
        setPartnerData(response.data);
        initializeDocumentStatus(response.data.documents); // Initialize document status
      } catch (error) {
        console.error('Error fetching delivery partner data', error);
      }
    };
    fetchDeliveryPartnerData();
  }, [deliveryPartnerId]);

  const initializeDocumentStatus = (documents: { [key: string]: DocumentData }) => {
    const initialStatus: { [key: string]: 'approved' | 'rejected' } = {};
    Object.keys(documents).forEach((docType) => {
      initialStatus[docType] = documents[docType].status || 'rejected';
    });

    setDocumentStatus(initialStatus);
  };

  const handleDocumentStatusChange = (docType: string, isChecked: boolean) => {
    setDocumentStatus((prevStatus) => ({
      ...prevStatus,
      [docType]: isChecked ? 'approved' : 'rejected',
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = {
        documentStatus,
        message,
      };
      await axiosInstance.post(`/admin/partner/${deliveryPartnerId}/validateDocuments`, data);
      navigate('/admin/partner/list');
    } catch (error) {
      console.error('Error submitting validation data', error);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setPreviewImage(imageUrl);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  return (
    <Box padding={3}>
      {partnerData ? (
        <>
          <Typography variant="h4">
            Validate Delivery Partner: {partnerData.firstName} {partnerData.lastName}
          </Typography>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Email: {partnerData.email}</Typography>
              <Typography variant="subtitle1">Phone: {partnerData.phone}</Typography>
              <Typography variant="subtitle1">City: {partnerData.city}</Typography>
              <Typography variant="subtitle1">Address: {partnerData.address}</Typography>
              <Typography variant="subtitle1">Blood Group: {partnerData.bloodGroup}</Typography>
              <Typography variant="subtitle1">
                Date of Birth: {new Date(partnerData.dob).toLocaleDateString()}
              </Typography>
              <Typography variant="subtitle1">
                Account Verified: {partnerData.isVerified ? 'Yes' : 'No'}
              </Typography>
              <Typography variant="subtitle1">
                Availability: {partnerData.availability.idAvailable ? 'Available' : 'Not Available'}
              </Typography>
              <Typography variant="subtitle1">
                Last Availability Update:{' '}
                {new Date(partnerData.availability.lastUpdate).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1">
                Average Rating: {partnerData.ratings.averageRating} (
                {partnerData.ratings.reviewCount} reviews)
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Avatar
                src={partnerData.avatar}
                alt={`${partnerData.firstName} Avatar`}
                sx={{ width: 100, height: 100, marginY: 2 }}
              />
              <Typography variant="subtitle1">
                Created At: {new Date(partnerData.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1">
                Updated At: {new Date(partnerData.updatedAt).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>

          {/* Display Documents for Validation */}
          <Paper elevation={3} sx={{ padding: 2, marginY: 2 }}>
            <Typography variant="h6">Documents</Typography>
            <Divider sx={{ marginY: 1 }} />

            {Object.entries(partnerData.documents).map(([docType, docData]) => (
              <Box key={docType} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1">{docType.toUpperCase()}</Typography>
                <Grid container spacing={2}>
                  {Object.entries(docData).map(([key, value]) => (
                    <Grid item xs={12} md={6} key={key}>
                      {typeof value === 'string' && value.startsWith('http') ? (
                        <>
                          <Typography variant="body2">{key}:</Typography>
                          <img
                            src={value}
                            alt={key}
                            style={{
                              width: '100%',
                              height: 'auto',
                              cursor: 'pointer',
                              maxWidth: '300px',
                              maxHeight: '200px',
                            }}
                            onClick={() => handleImageClick(value)}
                          />
                        </>
                      ) : (
                        <>
                          <Typography variant="body2">{key}:</Typography>
                          <TextField
                            fullWidth
                            value={value}
                            InputProps={{
                              readOnly: true,
                            }}
                            sx={{ marginBottom: 1 }}
                          />
                        </>
                      )}
                    </Grid>
                  ))}
                  {/* Checkbox for Document Acceptance */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={documentStatus[docType] === 'approved'}
                          onChange={(e) => handleDocumentStatusChange(docType, e.target.checked)}
                        />
                      }
                      label="Mark as Accepted"
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}

            {/* Message Field */}
            <TextField
              fullWidth
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={4}
              sx={{ marginTop: 2 }}
            />
          </Paper>

          {/* Submit Button */}
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
            Submit
          </Button>

          {/* Image Preview Dialog */}
          <Dialog open={!!previewImage} onClose={handleClosePreview}>
            <img
              src={previewImage as string}
              alt="Document Preview"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </Dialog>
        </>
      ) : (
        <Typography>Loading delivery partner data...</Typography>
      )}
    </Box>
  );
};

export default AdminValidationPage;
