import React, { useState } from 'react';
import { Upload, Button, Progress, notification, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosInstance from '@/config/axios';

interface DocumentUploadProps {
  onComplete: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onComplete }) => {
  const [aadharFront, setAadharFront] = useState<any>(null);
  const [aadharBack, setAadharBack] = useState<any>(null);
  const [panCard, setPanCard] = useState<any>(null);
  const [drivingLicenseFront, setDrivingLicenseFront] = useState<any>(null);
  const [drivingLicenseBack, setDrivingLicenseBack] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileChange = (file: any, setFile: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFile({
        file: file.file,
        preview: reader.result as string,
      });
    };
    reader.readAsDataURL(file.file);
  };

  const handleUpload = async () => {
    if (!aadharFront || !aadharBack || !panCard || !drivingLicenseFront || !drivingLicenseBack) {
      notification.error({
        message: 'Validation Error',
        description: 'Please upload all required documents.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('aadharFront', aadharFront.file);
    formData.append('aadharBack', aadharBack.file);
    formData.append('panCard', panCard.file);
    formData.append('drivingLicenseFront', drivingLicenseFront.file);
    formData.append('drivingLicenseBack', drivingLicenseBack.file);

    try {
      const response = await axiosInstance.post('/shopOwner/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      if (response.status === 200) {
        notification.success({
          message: 'Upload Successful',
          description: 'All documents uploaded successfully!',
        });
        setUploadProgress(100);
        onComplete();
      } else {
        notification.error({
          message: 'Upload Failed',
          description: 'Something went wrong during the upload. Please try again.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Upload Error',
        description: 'An error occurred during the upload. Please check your files and try again.',
      });
    }
  };

  return (
    <>
      <h2>Upload Documents</h2>

      <div>
        <h3>Aadhar Card</h3>
        <Upload
          beforeUpload={(file) => handleFileChange({ file }, setAadharFront)}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload Front Side</Button>
        </Upload>
        {aadharFront && <Image width={200} src={aadharFront.preview} alt="Aadhar Front Preview" />}

        <Upload
          beforeUpload={(file) => handleFileChange({ file }, setAadharBack)}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload Back Side</Button>
        </Upload>
        {aadharBack && <Image width={200} src={aadharBack.preview} alt="Aadhar Back Preview" />}
      </div>

      <div>
        <h3>PAN Card</h3>
        <Upload
          beforeUpload={(file) => handleFileChange({ file }, setPanCard)}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload PAN Card</Button>
        </Upload>
        {panCard && <Image width={200} src={panCard.preview} alt="PAN Card Preview" />}
      </div>

      <div>
        <h3>Driving License</h3>
        <Upload
          beforeUpload={(file) => handleFileChange({ file }, setDrivingLicenseFront)}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload Front Side</Button>
        </Upload>
        {drivingLicenseFront && (
          <Image
            width={200}
            src={drivingLicenseFront.preview}
            alt="Driving License Front Preview"
          />
        )}

        <Upload
          beforeUpload={(file) => handleFileChange({ file }, setDrivingLicenseBack)}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload Back Side</Button>
        </Upload>
        {drivingLicenseBack && (
          <Image width={200} src={drivingLicenseBack.preview} alt="Driving License Back Preview" />
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <Button type="primary" onClick={handleUpload}>
          Submit Documents
        </Button>
      </div>

      {uploadProgress > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Progress percent={uploadProgress} />
        </div>
      )}
    </>
  );
};

export default DocumentUpload;
