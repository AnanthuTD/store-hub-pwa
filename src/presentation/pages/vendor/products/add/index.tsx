import React, { useState } from 'react';
import { Form, Button, UploadFile, notification } from 'antd';
import ProductFormFields, { SelectOption } from './ProductFormFields';
import axiosInstance from '@/config/axios';
import ImageUpload from '../components/ImageUpload';
import DynamicFormFields from './DynamicFormFields';

const AddProductForm: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
  const [productForm] = Form.useForm(); // Hook for controlling the form
  const [selectedProduct, setSelectedProduct] = useState({ name: '', _id: '' });

  // Clear initial values
  const initialValues = {
    name: [],
    category: '',
    brand: '',
    storeId: '',
    description: '',
    attributes: [],
    specifications: [],
    status: '',
    variants: [{}],
  };

  // Function to handle form submission
  const handleSubmit = async (values: any) => {
    console.log('Submitted values:', values);
    console.log('Submitted values:', selectedProduct);

    // Ensure at least one image is uploaded
    if (imageFiles.length < 1) {
      notification.error({ message: 'Please upload at least 1 image.' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', selectedProduct.name);
      formData.append('productId', selectedProduct._id);
      formData.append('category', values.category);
      formData.append('brand', values.brand);
      formData.append('storeId', values.storeId || '66e5d5e94ec847f4a2383e94');
      formData.append('description', values.description);
      formData.append('variants', JSON.stringify(values.variants));
      formData.append('status', values.status || 'active');

      const existingImages: string[] = [];

      // Append new images
      imageFiles.forEach((file, index) => {
        if (file.url) {
          existingImages.push(file.url);
          return;
        }
        if (file.originFileObj) formData.append(`image_${index}`, file.originFileObj);
      });

      formData.append(`existingImages`, JSON.stringify(existingImages));

      await axiosInstance.post('/vendor/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      notification.success({ message: 'Product added successfully!' });
      setImageFiles([]); // Clear images after submission
    } catch (error) {
      notification.error({ message: error.response.data.message || 'Error adding product' });
      console.error(error);
    }
  };

  // Function to handle product selection
  async function onSelectProduct(product: SelectOption) {
    setSelectedProduct({
      name: product.label,
      _id: product.value,
    });

    if (selectedProduct._id) {
      try {
        const { data } = await axiosInstance.get(`/vendor/products/${selectedProduct._id}`);

        console.log('Selected Product: ', data);

        if (Object.keys(data.product).length > 0) {
          // Set form values using fetched product data
          productForm.setFieldsValue({
            name: [data.product.name],
            category: data.product.category,
            brand: data.product.brand,
            sku: data.product.sku,
            stock: data.product.stock,
            price: data.product.price,
            description: data.product.description,
            variants: data.product.variants || [{}],
            status: data.product.status || 'active',
          });

          setImageFiles(data.product.images.map((url) => ({ url })));
        } else {
          productForm.resetFields();
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    } else {
      console.log('resetting form');
      productForm.resetFields();
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
      form={productForm} // Control the form
    >
      {/* Modularized Form Fields */}
      <ProductFormFields onSelectProduct={onSelectProduct} />

      {/* Dynamic Form Fields for attributes, specifications, and variants */}
      <DynamicFormFields name="variants" label="Variants" />

      {/* Modularized Image Upload */}
      <ImageUpload imageFiles={imageFiles} setImageFiles={setImageFiles} />

      <Form.Item style={{ marginTop: '20px' }}>
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;
