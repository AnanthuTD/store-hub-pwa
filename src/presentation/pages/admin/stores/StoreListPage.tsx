// src/components/ShopList.tsx
import React, { useEffect, useState } from 'react';
import { List, Avatar, Pagination, Spin, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import axiosInstance from '@/config/axios';

interface IShop {
  _id: string;
  name: string;
  images: string[];
  rating: number;
}

const ShopList: React.FC = () => {
  const [shops, setShops] = useState<IShop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalShops, setTotalShops] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const pageSize = 10;

  const fetchShops = async (page: number, query: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/admin/store`, {
        params: { page, limit: pageSize, search: query },
      });
      setShops(response.data.data);
      setTotalShops(response.data.total);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const resetSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <>
      <Input
        placeholder="Search shops"
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
        allowClear
      />
      <Button type="default" onClick={resetSearch} style={{ marginBottom: '20px' }}>
        Reset Search
      </Button>

      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={shops}
            renderItem={(shop) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={shop.images?.[0]} />}
                  title={<Link to={`/admin/store/details?storeId=${shop._id}`}>{shop.name}</Link>}
                  description={`Rating: ${shop.rating}`}
                />
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalShops}
            onChange={onPageChange}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
        </>
      )}
    </>
  );
};

export default ShopList;
