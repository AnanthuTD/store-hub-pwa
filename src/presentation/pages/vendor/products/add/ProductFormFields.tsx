import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import useFetchCategories from '@/hooks/useFetchCategories';

const { Option } = Select;

const ProductFormFields: React.FC = () => {
  const { categories, loading, error } = useFetchCategories();

  return (
    <>
      <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
        <Input />
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

      <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <InputNumber min={0.01} step={0.01} />
      </Form.Item>

      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
    </>
  );
};

export default ProductFormFields;
