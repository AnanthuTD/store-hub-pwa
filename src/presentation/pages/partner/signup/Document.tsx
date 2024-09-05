import React from 'react';
import DocumentItem from '@/presentation/components/Partner/Registration/DocumentItem';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';
import { IDeliveryPartner } from '@/domain/entities/DeliveryPartner';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '@/config/axios';
import Compressor from 'compressorjs';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

async function compressImage(file: File) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6, // Adjust quality as needed
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

const baseUrl = '/partner/signup/document';

const documentTypes = [
  {
    title: 'Personal Documents',
    type: 'personalDocs',
    completed: false,
    to: `${baseUrl}/personal`,
  },
  { title: 'Vehicle Details', type: 'vehicleDetails', completed: false, to: `${baseUrl}/vehicle` },
  {
    title: 'Bank Account Details',
    type: 'bankDetails',
    completed: false,
    to: `${baseUrl}/bank`,
  },
  {
    title: 'Emergency Details',
    type: 'emergencyDetails',
    completed: false,
    to: `${baseUrl}/emergency`,
  },
];

async function convertObjectURLToFile(objectURL: string, fileName: string): Promise<File> {
  const response = await fetch(objectURL);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const storedPartnerInfo = useSelector<RootState, Partial<IDeliveryPartner> | null>(
    (state) => state.partner.data,
  );
  const partner = useSelector<RootState, Partial<IDeliveryPartner> | null>(
    (state) => state.partner.data,
  );

  if (partner) {
    const personalDocsCompleted = ['aadhar', 'pan', 'drivingLicense'].every(
      (doc) => partner?.documents?.[doc]?.frontImage && partner?.documents?.[doc]?.backImage,
    );

    // Mark personal documents as completed
    if (personalDocsCompleted) {
      documentTypes[0].completed = true;
    }

    documentTypes[1].completed = !!partner.documents?.vehicle;
    documentTypes[2].completed = !!partner.documents?.bankAccountDetails;
    documentTypes[3].completed = !!partner.documents?.emergencyContact;
  }

  const isCompleted = documentTypes.every((e) => e.completed);

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append basic fields
    if (storedPartnerInfo?.firstName) formData.append('firstName', storedPartnerInfo.firstName);
    if (storedPartnerInfo?.lastName) formData.append('lastName', storedPartnerInfo.lastName);
    if (storedPartnerInfo?.dob) formData.append('dob', storedPartnerInfo.dob.toISOString());
    if (storedPartnerInfo?.city) formData.append('city', storedPartnerInfo.city);
    if (storedPartnerInfo?.address) formData.append('address', storedPartnerInfo.address);
    if (storedPartnerInfo?.avatar) {
      const avatarFile = await convertObjectURLToFile(storedPartnerInfo.avatar, 'avatar.png');
      formData.append('avatar', avatarFile);
    }
    if (storedPartnerInfo?.bloodGroup) formData.append('bloodGroup', storedPartnerInfo.bloodGroup);

    // Append contact information
    if (storedPartnerInfo?.contactInfo?.email)
      formData.append('contactInfo[email]', storedPartnerInfo.contactInfo.email);
    if (storedPartnerInfo?.contactInfo?.phone)
      formData.append('contactInfo[phone]', storedPartnerInfo.contactInfo.phone);

    // Append availability
    if (storedPartnerInfo?.availability?.idAvailable !== undefined)
      formData.append(
        'availability[idAvailable]',
        storedPartnerInfo.availability.idAvailable.toString(),
      );
    if (storedPartnerInfo?.availability?.lastUpdate)
      formData.append('availability[lastUpdate]', storedPartnerInfo.availability.lastUpdate);

    // Append document files and related details
    const docs = storedPartnerInfo?.documents;
    if (docs) {
      const personalDocs = ['aadhar', 'pan', 'drivingLicense'];
      for (const doc of personalDocs) {
        if (docs[doc]) {
          const frontImageFile = await convertObjectURLToFile(
            docs[doc].frontImage!,
            `${doc}_front.png`,
          );
          const backImageFile = await convertObjectURLToFile(
            docs[doc].backImage!,
            `${doc}_back.png`,
          );

          const compressedFrontImage = await compressImage(frontImageFile);
          const compressedBackImage = await compressImage(backImageFile);

          formData.append(`documents[${doc}][frontImage]`, compressedFrontImage);
          formData.append(`documents[${doc}][backImage]`, compressedBackImage);
        }
      }

      // Append vehicle details
      if (docs.vehicle) {
        formData.append('documents[vehicle][vehicleType]', docs.vehicle.vehicleType);
        formData.append('documents[vehicle][vehicleModel]', docs.vehicle.vehicleModel);
        formData.append('documents[vehicle][registrationNumber]', docs.vehicle.registrationNumber);
        formData.append('documents[vehicle][registrationYear]', docs.vehicle.registrationYear);
      }

      // Append bank account details
      if (docs.bankAccountDetails) {
        formData.append(
          'documents[bankAccountDetails][accountHolderName]',
          docs.bankAccountDetails.accountHolderName!,
        );
        formData.append(
          'documents[bankAccountDetails][ifscCode]',
          docs.bankAccountDetails.ifscCode!,
        );
        formData.append(
          'documents[bankAccountDetails][accountNumber]',
          docs.bankAccountDetails.accountNumber!,
        );
        formData.append(
          'documents[bankAccountDetails][bankName]',
          docs.bankAccountDetails.bankName!,
        );
      }

      // Append emergency contact details
      if (docs.emergencyContact) {
        formData.append(
          'documents[emergencyContact][relationship]',
          docs.emergencyContact.relationship!,
        );
        formData.append('documents[emergencyContact][phone]', docs.emergencyContact.phone!);
        formData.append('documents[emergencyContact][name]', docs.emergencyContact.name!);
      }
    }

    try {
      const response = await axiosInstance.post('/partner/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        navigate('/partner/signup/complete');
      } else {
        console.error('Failed to submit:', response.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#F8F8F8',
        padding: 3,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ marginBottom: 3 }}>
        <Link to={'/partner/signup/profile'}>
          <KeyboardArrowLeftIcon />
        </Link>
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(90deg, #FF6B6B 0%, #FFA13C 100%)',
            borderRadius: 3,
            color: '#fff',
            padding: 2,
            marginBottom: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Welcome to ShopHub
          </Typography>
          <Typography variant="body2">
            Just a few steps to complete, and then you can start earning with us
          </Typography>
        </Box>

        {/* Pending Documents Section */}
        <Box marginTop={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Pending Documents
          </Typography>
          <Grid container spacing={2}>
            {documentTypes.map(
              (doc) =>
                !doc.completed && (
                  <Grid item xs={12} key={doc.title}>
                    <Link to={doc.to} style={{ textDecoration: 'none' }}>
                      <DocumentItem title={doc.title} completed={doc.completed} />
                    </Link>
                  </Grid>
                ),
            )}
          </Grid>
        </Box>

        {/* Completed Documents Section */}
        {documentTypes.some((doc) => doc.completed) && (
          <Box marginTop={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Completed Documents
            </Typography>
            <Grid container spacing={2}>
              {documentTypes.map(
                (doc) =>
                  doc.completed && (
                    <Grid item xs={12} key={doc.title}>
                      <Link to={doc.to} style={{ textDecoration: 'none' }}>
                        <DocumentItem title={doc.title} completed={doc.completed} />
                      </Link>
                    </Grid>
                  ),
              )}
            </Grid>
          </Box>
        )}
      </Box>

      {/* Submit Button */}
      <Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#FF6B6B',
            color: '#fff',
            borderRadius: 3,
            paddingY: 1.5,
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#FF6B6B',
            },
          }}
          onClick={handleSubmit}
          disabled={!isCompleted}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentsPage;
