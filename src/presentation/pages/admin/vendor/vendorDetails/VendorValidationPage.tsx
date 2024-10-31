// VendorValidationPage.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import axiosInstance from '@/config/axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BankDetails from './BankDetails';
import DocumentList from './DocumentList';
import ImagePreviewDialog from './ImagePreviewDialog';
import { IVendor } from '@/domain/entities/IVendor';
import ShopOwnerDetails from './VendorDetails';

const VendorValidationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [shopOwnerData, setShopOwnerData] = useState<IVendor | null>(null);
  const [message, setMessage] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [documentStatus, setDocumentStatus] = useState<{ [key: string]: 'approved' | 'rejected' }>(
    {},
  );

  const vendorId = searchParams.get('id');

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axiosInstance.get(`/admin/vendor/${vendorId}`);
        setShopOwnerData(response.data.data);
        initializeDocumentStatus(response.data.data.documents);
      } catch (error) {
        console.error('Error fetching shop owner data', error);
      }
    };
    fetchVendor();
  }, [vendorId]);

  const initializeDocumentStatus = (documents?: IVendor['documents']) => {
    const initialStatus: { [key: string]: 'approved' | 'rejected' } = {};
    documents?.forEach((doc) => {
      if (doc.type) {
        initialStatus[doc.type] = doc.status === 'approved' ? 'approved' : 'rejected';
      }
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
      const data = { documentStatus, message };
      await axiosInstance.post(`/admin/vendor/${vendorId}/validateDocuments`, data);
      navigate('/admin/vendor/verification/unverified');
    } catch (error) {
      console.error('Error submitting validation data', error);
    }
  };

  const handleImageClick = (imageUrl: string) => setPreviewImage(imageUrl);
  const handleClosePreview = () => setPreviewImage(null);

  return (
    <Box padding={3}>
      {shopOwnerData ? (
        <>
          <Typography variant="h4">
            Validate Shop Owner: {shopOwnerData.profile?.firstName}{' '}
            {shopOwnerData.profile?.lastName}
          </Typography>
          <ShopOwnerDetails shopOwnerData={shopOwnerData} />
          <BankDetails bankDetails={shopOwnerData.bankDetails} />
          <DocumentList
            documents={shopOwnerData.documents}
            documentStatus={documentStatus}
            onStatusChange={handleDocumentStatusChange}
            onImageClick={handleImageClick}
          />
          <TextField
            label="Additional Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Validate Documents
          </Button>
          <ImagePreviewDialog previewImage={previewImage} onClose={handleClosePreview} />
        </>
      ) : (
        <Typography variant="body1">Loading shop owner data...</Typography>
      )}
    </Box>
  );
};

export default VendorValidationPage;
