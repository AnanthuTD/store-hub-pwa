import React, { useState } from 'react';
import { Table, DatePicker, Button, Select, message } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';
import axiosInstance from '@/config/axios';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const { RangePicker } = DatePicker;
const { Option } = Select;

const SalesReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState([]);
  const storeId = useSelector((state: RootState) => state.vendor.selectedStore?._id);

  const downloadCSV = () => {
    // Transform reportData to the format suitable for CSV
    const csvData = reportData.map((item) => ({
      'Product ID': item.productId,
      'Product Name': item.productName,
      'Total Revenue': `$${item.totalRevenue.toFixed(2)}`,
      'Total Quantity Sold': item.totalQuantity,
      'Total Orders': item.totalOrders,
      'Order Date': item.orderDate,
    }));

    // Generate CSV file
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sales_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success('CSV file downloaded successfully!');
  };

  const downloadXLSX = () => {
    // Transform reportData to the format suitable for XLSX
    const xlsxData = reportData.map((item) => ({
      'Product ID': item.productId,
      'Product Name': item.productName,
      'Total Revenue': item.totalRevenue.toFixed(2),
      'Total Quantity Sold': item.totalQuantity,
      'Total Orders': item.totalOrders,
      'Order Date': item.orderDate,
    }));

    // Create a new workbook
    const ws = XLSX.utils.json_to_sheet(xlsxData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sales Report');

    // Generate XLSX file
    XLSX.writeFile(wb, 'sales_report.xlsx');
    message.success('XLSX file downloaded successfully!');
  };

  const fetchSalesReport = async () => {
    setLoading(true);
    const [startDate, endDate] = dateRange;

    try {
      const response = await axiosInstance.get(`/vendor/dashboard/store/${storeId}/sales-report`, {
        params: {
          startDate: startDate ? startDate.format('YYYY-MM-DD') : undefined,
          endDate: endDate ? endDate.format('YYYY-MM-DD') : undefined,
          reportType,
        },
      });

      setReportData(response.data.salesData);
      message.success('Sales report fetched successfully!');
    } catch (error) {
      message.error('Failed to fetch sales report!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Total Revenue',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      render: (text) => `$${text.toFixed(2)}`, // Format as currency
    },
    {
      title: 'Total Quantity Sold',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: 'Total Orders',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sales Report</h2>
      <Select
        defaultValue="daily"
        style={{ width: 120, marginBottom: 20 }}
        onChange={(value) => setReportType(value)}
      >
        <Option value="daily">Daily</Option>
        <Option value="monthly">Monthly</Option>
        <Option value="custom">Custom Date Range</Option>
      </Select>
      {reportType === 'custom' && (
        <RangePicker style={{ marginBottom: 20 }} onChange={(dates) => setDateRange(dates)} />
      )}

      <Button
        type="primary"
        loading={loading}
        onClick={fetchSalesReport}
        style={{ marginRight: 10 }}
      >
        Fetch Report
      </Button>
      <Button
        type="default"
        onClick={downloadCSV}
        disabled={reportData.length === 0} // Disable if no data to download
        style={{ marginRight: 10 }}
      >
        Download CSV
      </Button>
      <Button
        type="default"
        onClick={downloadXLSX}
        disabled={reportData.length === 0} // Disable if no data to download
      >
        Download XLSX
      </Button>

      <Table
        dataSource={reportData}
        columns={columns}
        rowKey="productId" // Assuming productId is unique
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default SalesReport;
