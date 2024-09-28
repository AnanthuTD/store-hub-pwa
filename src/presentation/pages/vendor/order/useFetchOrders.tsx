import { useEffect, useState } from 'react';
import axiosInstance from '@/config/axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';
import { Order } from './types';

interface AxiosResponse {
  page: number;
  limit: number;
  totalOrders: number;
  totalPages: number;
  orders: Order[];
}

interface FetchOrdersParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  paymentStatus?: string;
  paymentMethod?: string;
  startDate?: string;
  endDate?: string;
  searchId?: string;
}

function useFetchOrders({
  page = 1,
  limit = 10,
  sortBy = 'orderDate',
  order = 'asc',
  paymentStatus,
  paymentMethod,
  startDate,
  endDate,
  searchId,
}: FetchOrdersParams) {
  const selectedStore = useSelector<RootState, RootState['vendor']['selectedStore']>(
    (state) => state.vendor.selectedStore,
  );

  const [ordersData, setOrdersData] = useState<Order[]>([]); // List of all fetched orders
  const [paginationInfo, setPaginationInfo] = useState<Omit<AxiosResponse, 'orders'> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedStore) return;

    const fetchOrders = async () => {
      setLoading(true);
      setError(null); // Reset error state before making the request
      try {
        const { data } = await axiosInstance.get<AxiosResponse>('/vendor/orders', {
          params: {
            storeId: selectedStore._id,
            page,
            limit,
            sortBy,
            order,
            paymentStatus,
            paymentMethod,
            startDate,
            endDate,
            searchId,
          },
        });

        setOrdersData(data.orders); // Replace orders when on page 1

        setPaginationInfo({
          page: data.page,
          limit: data.limit,
          totalOrders: data.totalOrders,
          totalPages: data.totalPages,
        });
      } catch (err) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [
    selectedStore,
    page,
    limit,
    sortBy,
    order,
    paymentStatus,
    paymentMethod,
    startDate,
    endDate,
    searchId,
  ]);

  return { ordersData, paginationInfo, loading, error };
}

export default useFetchOrders;
