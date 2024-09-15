// src/components/ProductModal.tsx

import React from 'react';
import { Form, Modal } from 'antd';
import ProductForm from './ProductForm';
import { Product } from './types';
import ImageUpload from '../components/ImageUpload';

interface ProductModalProps {
  visible: boolean;
  product: Product | null;
  imageFiles: any[]; // Use appropriate type for image files
  setImageFiles: React.Dispatch<React.SetStateAction<any[]>>;
  onOk: (values: object) => void;
  onCancel: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  product,
  imageFiles,
  setImageFiles,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Edit Product"
      open={visible}
      onOk={() => onOk(form.getFieldsValue())}
      onCancel={onCancel}
    >
      {product && (
        <>
          <ProductForm product={product} form={form} />
          <ImageUpload imageFiles={imageFiles} setImageFiles={setImageFiles} />
        </>
      )}
    </Modal>
  );
};

export default ProductModal;
