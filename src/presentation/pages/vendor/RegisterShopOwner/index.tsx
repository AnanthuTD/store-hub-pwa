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

function Index() {
  const shopOwner = useSelector((state: RootState) => state.vendor.data);

  const [step, setStep] = useState(0);

  const handleUploadComplete = () => {
    setStep(3);
    notification.success({ message: 'Success', description: 'Registration complete!' });
  };

  async function handleFormSubmit(shopOwner: ShopOwner) {
    try {
      await axiosInstance.post('/vendor/register', shopOwner);
      setStep(1);
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        notification.error({ message: 'Error', description: err.response.data.message });
      } else {
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
