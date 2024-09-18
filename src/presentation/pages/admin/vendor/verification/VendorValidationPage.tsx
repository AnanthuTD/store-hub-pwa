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

interface ShopOwnerData {
  _id: string;
  isVerified: boolean;
  documents?: {
    imageUrl: string[] | null;
    type: string | null;
  }[];
  bankDetails?: {
    accountHolderName: string | null;
    accountNumber: string | null;
    bankName: string | null;
    ifscCode: string | null;
  };
  authMethods?: {
    passwordHash: string | null;
    provider: 'credential' | 'google' | 'otp';
  }[];
  emailVerified?: boolean;
  createdAt?: string | null;
  email?: string | null;
  phone?: string | null;
  updatedAt?: string | null;
  profile: {
    address: {
      city: string | null;
      country: string | null;
      postalCode: string | null;
      state: string | null;
      street: string | null;
    };
    firstName: string;
    lastName: string;
    avatar: string;
  } | null;
}

const VendorValidationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [shopOwnerData, setShopOwnerData] = useState<ShopOwnerData | null>(null);
  const [message, setMessage] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [documentStatus, setDocumentStatus] = useState<{ [key: string]: 'approved' | 'rejected' }>(
    {},
  );

  const shopOwnerId = searchParams.get('id');

  console.log(shopOwnerId);

  // Fetch shop owner data on component mount
  useEffect(() => {
    const fetchShopOwnerData = async () => {
      try {
        const response = await axiosInstance.get(`/admin/vendor/${shopOwnerId}`);
        setShopOwnerData(response.data.data);
        initializeDocumentStatus(response.data.data.documents);
      } catch (error) {
        console.error('Error fetching shop owner data', error);
      }
    };
    fetchShopOwnerData();
  }, [shopOwnerId]);

  const initializeDocumentStatus = (
    documents?: {
      imageUrl: string[] | null;
      type: string | null;
      status: 'pending' | 'approved' | 'rejected';
    }[],
  ) => {
    // Initialize the status object
    const initialStatus: { [key: string]: 'approved' | 'rejected' } = {};

    // Ensure documents array exists
    if (documents && Array.isArray(documents)) {
      // Iterate over each document in the documents array
      documents.forEach((doc) => {
        if (doc.type) {
          // Set the initial status based on the document's current status
          // If status is 'approved' or 'rejected', keep it, otherwise set to 'rejected' by default
          initialStatus[doc.type] = doc.status === 'approved' ? 'approved' : 'rejected';
        }
      });
    }

    // Set the document statuses with the initialized values
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
      await axiosInstance.post(`/admin/vendor/${shopOwnerId}/validateDocuments`, data);
      navigate('/admin/vendor/verification/pending');
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
      {shopOwnerData ? (
        <>
          <Typography variant="h4">
            Validate Shop Owner: {shopOwnerData.profile?.firstName}{' '}
            {shopOwnerData.profile?.lastName}
          </Typography>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Email: {shopOwnerData.email}</Typography>
              <Typography variant="subtitle1">Phone: {shopOwnerData.phone}</Typography>
              <Typography variant="subtitle1">
                City: {shopOwnerData.profile?.address.city}
              </Typography>
              <Typography variant="subtitle1">
                Address: {shopOwnerData.profile?.address.street}
              </Typography>
              <Typography variant="subtitle1">
                Account Verified: {shopOwnerData.isVerified ? 'Yes' : 'No'}
              </Typography>
              <Typography variant="subtitle1">
                Email Verified: {shopOwnerData.emailVerified ? 'Yes' : 'No'}
              </Typography>
              <Typography variant="subtitle1">
                Created At: {new Date(shopOwnerData.createdAt ?? '').toLocaleString()}
              </Typography>
              <Typography variant="subtitle1">
                Updated At: {new Date(shopOwnerData.updatedAt ?? '').toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Avatar
                src={shopOwnerData.profile?.avatar}
                alt={`${shopOwnerData.profile?.firstName} Avatar`}
                sx={{ width: 100, height: 100, marginY: 2 }}
              />
            </Grid>
          </Grid>

          {/* Bank Details */}
          <Paper elevation={3} sx={{ padding: 2, marginY: 2 }}>
            <Typography variant="h6">Bank Details</Typography>
            <Divider sx={{ marginY: 1 }} />
            <Typography variant="subtitle1">
              Account Holder Name: {shopOwnerData.bankDetails?.accountHolderName}
            </Typography>
            <Typography variant="subtitle1">
              Account Number: {shopOwnerData.bankDetails?.accountNumber}
            </Typography>
            <Typography variant="subtitle1">
              Bank Name: {shopOwnerData.bankDetails?.bankName}
            </Typography>
            <Typography variant="subtitle1">
              IFSC Code: {shopOwnerData.bankDetails?.ifscCode}
            </Typography>
          </Paper>

          {/* Display Documents for Validation */}
          <Paper elevation={3} sx={{ padding: 2, marginY: 2 }}>
            <Typography variant="h6">Documents</Typography>
            <Divider sx={{ marginY: 1 }} />

            {shopOwnerData.documents?.map((doc, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1">{doc.type?.toUpperCase()}</Typography>
                <Grid container spacing={2}>
                  {doc.imageUrl?.map((image, idx) => (
                    <Grid item xs={12} md={6} key={idx}>
                      <img
                        src={`${image}`}
                        alt={doc.type ?? 'Document'}
                        style={{
                          width: '100%',
                          height: 'auto',
                          cursor: 'pointer',
                          maxWidth: '300px',
                          maxHeight: '200px',
                        }}
                        onClick={() => handleImageClick(`/api/admin/vendor/document/${image}`)}
                      />
                    </Grid>
                  ))}
                  {/* Checkbox for Document Acceptance */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={documentStatus[doc.type as string] === 'approved'}
                          onChange={(e) =>
                            handleDocumentStatusChange(doc.type as string, e.target.checked)
                          }
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
          <Dialog open={!!previewImage} onClose={handleClosePreview} fullWidth>
            <img
              src={previewImage as string}
              alt="Document Preview"
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </Dialog>
        </>
      ) : (
        <Typography>Loading shop owner data...</Typography>
      )}
    </Box>
  );
};

export default VendorValidationPage;
