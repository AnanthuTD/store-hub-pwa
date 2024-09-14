import React, { useState } from 'react';
import { Form, Button, UploadFile, notification } from 'antd';
import ProductFormFields from './ProductFormFields';
import axiosInstance from '@/config/axios';
import ImageUpload from '../components/ImageUpload';
import DynamicFormFields from './DynamicFormFields';

const AddProductForm: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);

  // Sample initial values for testing
  const initialValues = {
    name: 'Test Product',
    category: 'electronics',
    brand: 'Test Brand',
    storeId: '12345',
    sku: 'TEST123',
    stock: 50,
    price: 1000,
    description: 'This is a sample description.',
    attributes: [
      { key: 'color', value: 'black' },
      { key: 'size', value: 'M' },
    ], // Example attributes
    specifications: [
      { key: 'material', value: 'cotton' },
      { key: 'weight', value: '500g' },
    ], // Example specifications
    variants: [{ key: 'Color', value: 'Black, White' }], // Example variants
    status: 'active',
  };

  const handleSubmit = async (values: any) => {
    if (imageFiles.length < 1) {
      notification.error({ message: 'Please upload at least 1 image.' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('category', values.category);
      formData.append('brand', values.brand);
      formData.append('storeId', values.storeId || '66e5d5e94ec847f4a2383e94');
      formData.append('sku', values.sku);
      formData.append('stock', values.stock);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('attributes', JSON.stringify(values.attributes)); // Convert attributes to string
      formData.append('specifications', JSON.stringify(values.specifications)); // Convert specs to string
      formData.append('variants', JSON.stringify(values.variants)); // Convert variants to string
      formData.append('status', values.status || 'active');

      // Append images to formData
      imageFiles.forEach((file, index) => {
        if (file.originFileObj) {
          formData.append(`image_${index}`, file.originFileObj);
        }
      });

      await axiosInstance.post('/vendor/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      notification.success({ message: 'Product added successfully!' });
      setImageFiles([]); // Clear images after submission
    } catch (error) {
      notification.error({ message: 'Error adding product' });
      console.error(error);
    }
  };

  return (
    <Form layout="vertical" initialValues={initialValues} onFinish={handleSubmit}>
      {/* Modularized Form Fields */}
      <ProductFormFields />

      {/* Dynamic Form Fields for attributes, specifications, and variants */}
      <DynamicFormFields name="attributes" label="Attributes" />
      <DynamicFormFields name="specifications" label="Specifications" />
      <DynamicFormFields name="variants" label="Variants" />

      {/* Modularized Image Upload */}
      <ImageUpload imageFiles={imageFiles} setImageFiles={setImageFiles} />

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;
