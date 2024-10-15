// src/components/ShopDetails.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Row, Col, Button, Pagination } from 'antd';
import axiosInstance from '@/config/axios';

interface IProduct {
  _id: string;
  name: string;
  image: string;
}

const ShopDetails: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get('storeId');

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalProducts, setTotalProducts] = useState<number>(0); // Total number of products
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const [pageSize] = useState<number>(10); // Number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/admin/store/products`, {
          params: {
            storeId,
            page: currentPage,
            limit: pageSize, // Pass pagination parameters
          },
        });
        setProducts(response.data.products); // Adjust based on your response structure
        setTotalProducts(response.data.total); // Adjust based on your response structure
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchProducts();
    }
  }, [storeId, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Products in this Shop</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <Row gutter={16}>
            {products.map((product) => (
              <Col span={8} key={product._id}>
                <Card hoverable cover={<img alt={product.name} src={product.images?.[0]} />}>
                  <Card.Meta title={product.name} />
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalProducts}
            onChange={handlePageChange}
            style={{ marginTop: '16px' }}
          />
        </>
      )}
      <Button type="primary" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </div>
  );
};

export default ShopDetails;
