// src/components/ProductTable.tsx

import React from 'react';
import { Table, Button } from 'antd';
import { Product } from './types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit }) => (
  <Table
    dataSource={products}
    rowKey="_id"
    columns={[
      { title: 'Name', dataIndex: 'name' },
      {
        title: 'Category',
        dataIndex: 'category',
        render(value) {
          return value?.name;
        },
      },
      { title: 'Brand', dataIndex: 'brand' },
      { title: 'SKU', dataIndex: 'sku' },
      { title: 'Price', dataIndex: 'price' },
      { title: 'Stock', dataIndex: 'stock' },
      { title: 'Status', dataIndex: 'status' },
      {
        title: 'Actions',
        render: (_, record) => <Button onClick={() => onEdit(record)}>Edit</Button>,
      },
    ]}
  />
);

export default ProductTable;
