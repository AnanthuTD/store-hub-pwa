// src/components/ProductManager.tsx

import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import axiosInstance from '@/config/axios';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import { Product } from './types';

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageFiles, setImageFiles] = useState<any[]>([]); // Use appropriate type for image files

  const storeId = '66e8362b99d8b460761d0a04';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(`/vendor/products/store/${storeId}/products`);
        setProducts(response.data);
      } catch (error) {
        notification.error({ message: 'Failed to fetch products' });
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    console.log(product);

    setSelectedProduct(product);
    setImageFiles(product.images.map((url) => ({ url }))); // Convert image URLs to file objects
    setIsModalVisible(true);
  };

  const handleSave = async (values) => {
    console.log(values);
    console.log(imageFiles);

    try {
      const formData = new FormData();

      // Append non-file fields
      Object.keys(values).forEach((key) => {
        if (key !== 'images') {
          // Skip images field for now
          formData.append(key, JSON.stringify(values[key]));
        }
      });

      formData.append('productId', selectedProduct.productId);
      formData.append('description', selectedProduct?.description);

      const existingImages: string[] = [];

      // Append new images
      imageFiles.forEach((file, index) => {
        if (file.url) {
          existingImages.push(file.url);
          return;
        }
        formData.append(`image_${index}`, file.originFileObj);
      });

      formData.append(`existingImages`, JSON.stringify(existingImages));

      await axiosInstance.put(`/vendor/products/${selectedProduct?._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notification.success({ message: 'Product updated successfully' });
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Failed to update product' });
    }
  };

  return (
    <div>
      <ProductTable products={products} onEdit={handleEdit} />
      {selectedProduct ? (
        <ProductModal
          visible={isModalVisible}
          product={selectedProduct}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          onOk={handleSave}
          onCancel={() => setIsModalVisible(false)}
          key={selectedProduct._id}
        />
      ) : null}
    </div>
  );
};

export default ProductManager;
