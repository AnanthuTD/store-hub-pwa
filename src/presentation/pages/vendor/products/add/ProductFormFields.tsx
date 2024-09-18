import React, { useState, useMemo } from 'react';
import { Alert, Form, Input, InputNumber, Select } from 'antd';
import useFetchCategories from '@/hooks/useFetchCategories';
import useFetchProductNames from './useFetchProductNames';
import debounce from 'lodash/debounce'; // Import debounce from lodash

export interface SelectOption {
  value: string;
  label: string;
}

interface ProductFormFieldsProps {
  onSelectProduct: (product: SelectOption) => void;
}

const ProductFormFields: React.FC<ProductFormFieldsProps> = ({ onSelectProduct }) => {
  const { categories, loading: categoryLoading, error: categoryError } = useFetchCategories();
  const [productSearchTerm, setProductSearchTerm] = useState('');

  const { products, loading: productLoading } = useFetchProductNames(productSearchTerm);

  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);

  // Debounce the product search input
  const debouncedSetProductSearchTerm = useMemo(() => debounce(setProductSearchTerm, 800), []);

  const handleProductChange = (label: string, option: SelectOption) => {
    console.log(label, option);

    if (label.length === 0) {
      setSelectedProduct([]);
      return;
    }

    if (!Object.keys(option).length) {
      option.value = '';
      option.label = label;
    }

    setSelectedProduct([label]);

    console.log(option);

    onSelectProduct(option);

    // Clear the search term after selection
    setProductSearchTerm('');
  };

  return (
    <>
      <Alert
        banner
        message={
          "It's better to select an existing product to increase visibility, but you can create a new one if needed."
        }
        type="warning"
        style={{ marginBottom: '10px' }}
      />

      <Form.Item label="Product Name" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Search for a product or create new"
          onSearch={debouncedSetProductSearchTerm}
          onSelect={handleProductChange}
          filterOption={false}
          loading={productLoading}
          mode="tags"
          value={selectedProduct}
          options={products.map((product) => ({ label: product.name, value: product._id }))}
          onDeselect={() => setSelectedProduct([])}
        />
      </Form.Item>

      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        {categoryLoading ? (
          <p>Loading...</p>
        ) : categoryError ? (
          <p>{categoryError}</p>
        ) : (
          <Select
            showSearch
            placeholder="Select a category or create new"
            filterOption={(input, option) =>
              !!option?.label && option?.label.toLowerCase().includes(input.toLowerCase())
            }
            options={categories.map((category) => ({ label: category.name, value: category._id }))}
          />
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
