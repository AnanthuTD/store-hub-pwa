import React from 'react';
import { Form, Input, Select, Divider, FormInstance } from 'antd';
import { Product } from './types';
import DynamicFormFields from '../add/DynamicFormFields';
import useFetchCategories from '@/hooks/useFetchCategories';

const { Option } = Select;

interface ProductFormProps {
  product: Product;
  form: FormInstance;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, form }) => {
  const { categories, loading, error } = useFetchCategories();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        name: product.name,
        category: product.category._id,
        brand: product.brand,
        sku: product.sku,
        price: product.price,
        stock: product.stock,
        status: product.status,
        attributes: product.attributes,
        specifications: product.specifications,
        variants: product.variants,
      }}
    >
      <Form.Item label="Name" name="name">
        <Input readOnly value={product.name} />
      </Form.Item>

      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Select>
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Brand" name="brand">
        <Input value={product.brand} />
      </Form.Item>

      <Form.Item label="SKU" name="sku">
        <Input readOnly value={product.sku} />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <Input readOnly value={product.price} />
      </Form.Item>

      <Form.Item label="Stock" name="stock">
        <Input value={product.stock} />
      </Form.Item>

      <Form.Item label="Status" name="status">
        <Select value={product.status}>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Form.Item>

      {/* Attributes Section */}
      <Divider>Attributes</Divider>
      <DynamicFormFields name="attributes" label="Attribute" />

      {/* Specifications Section */}
      <Divider>Specifications</Divider>
      <DynamicFormFields name="specifications" label="Specification" />

      {/* Variants Section */}
      <Divider>Variants</Divider>
      <DynamicFormFields name="variants" label="Variant" />
    </Form>
  );
};

export default ProductForm;
