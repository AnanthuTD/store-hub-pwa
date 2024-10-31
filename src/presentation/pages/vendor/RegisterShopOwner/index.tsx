import axiosInstance from '@/config/axios';
import VendorForm from './VendorForm';
import { IVendor } from '@/domain/entities/IVendor';
import { useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';
import { useEffect, useState } from 'react';
import DocumentUpload from './DocumentUpload';
import { Alert, Button, notification, Steps } from 'antd';
import { AxiosError } from 'axios';

const { Step } = Steps;

type ShopOwner = Omit<IVendor, '_id'>;

// const shopOwnerData = {
//   email: 'shopOwner@gmail.com',
//   bankDetails: {
//     accountHolderName: 'John Doe',
//     accountNumber: '1234567890',
//     bankName: 'Sample Bank',
//     ifscCode: 'SBIN0001234',
//   },
//   createdAt: new Date('2023-01-01T00:00:00Z'), // Assume a past date for creation
//   phone: '+911234567890',
//   updatedAt: new Date('2024-09-01T00:00:00Z'), // Assume the last update was recent
//   profile: {
//     address: {
//       city: 'Mumbai',
//       country: 'India',
//       postalCode: '400001',
//       state: 'Maharashtra',
//       street: '123, Sample Street',
//     },
//     firstName: 'John',
//     lastName: 'Doe',
//   },
// };

function Index() {
  const shopOwner = useSelector((state: RootState) => state.vendor.data);

  const [step, setStep] = useState(0); // Step 1 for form, Step 2 for file upload

  const handleUploadComplete = () => {
    // Optionally handle post-upload actions here
    setStep(3);
    notification.success({ message: 'Success', description: 'Registration complete!' });
  };

  async function handleFormSubmit(shopOwner: ShopOwner) {
    try {
      const response = await axiosInstance.post('/vendor/register', shopOwner); // Await the response from axios
      console.log(response);
      setStep(1); // Assuming setStep is defined in your component or context
    } catch (err) {
      // Ensure to check if err is an AxiosError and handle accordingly
      if (err instanceof AxiosError && err.response) {
        notification.error({ message: 'Error', description: err.response.data.message });
      } else {
        // Handle unexpected errors
        notification.error({ message: 'Error', description: 'An unexpected error occurred' });
      }
    }
  }

  useEffect(() => {
    if (shopOwner?.documents?.length === 3) {
      setStep(2);
    }
  }, []);

  return (
    <>
      <Steps current={step} style={{ marginBottom: '20px' }}>
        <Step title="Shop Owner Details" />
        <Step title="Document Upload" />
        <Step title="Completed" />
      </Steps>

      {step === 0 && <VendorForm onSubmit={handleFormSubmit} initialValues={shopOwner || {}} />}
      {step === 1 && (
        <DocumentUpload defaultDocuments={shopOwner?.documents} onComplete={handleUploadComplete} />
      )}
      {step === 2 && (
        <div>
          Registration completed! Thank you for submitting your details.
          {shopOwner && shopOwner.isVerified ? (
            <Alert
              message="Verification Completed"
              description="Your can start selling your products."
              type="success"
              showIcon
              style={{ marginTop: 16 }}
            />
          ) : (
            <Alert
              message="Verification Pending"
              description="Your profile is under verification."
              type="info"
              action={
                <Button type="primary" onClick={() => setStep(0)}>
                  Edit Profile
                </Button>
              }
              showIcon
              style={{ marginTop: 16 }}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Index;
