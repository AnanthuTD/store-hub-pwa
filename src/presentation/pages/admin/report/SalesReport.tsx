import React, { useState } from 'react';
import { Table, Button, DatePicker, Select, message } from 'antd';
import axiosInstance from '@/config/axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AdminSalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState([null, null]);

  const fetchSalesData = async () => {
    setLoading(true);
    const [startDate, endDate] = dateRange.map((date) => date?.toISOString());

    // Validate date range
    /* if (!startDate || !endDate) {
      message.error('Please select a valid date range.');
      setLoading(false);
      return;
    } */

    if (new Date(startDate) > new Date(endDate)) {
      message.error('Start date cannot be later than end date.');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get('/admin/dashboard/sales-report', {
        params: { startDate, endDate, reportType },
      });
      if (response.data.success) {
        setSalesData(response.data.salesData);
      } else {
        message.error('No data found for the selected range.');
      }
    } catch (error) {
      message.error('Error fetching sales data');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const csvData = salesData.map((item) => ({
      ProductId: item.productId,
      ProductName: item.productName,
      StoreId: item.storeId,
      OrderDate: item.orderDate,
      TotalRevenue: item.totalRevenue,
      TotalQuantity: item.totalQuantity,
      TotalOrders: item.totalOrders,
    }));

    const csvContent = [
      [
        'Product ID',
        'Product Name',
        'Store ID',
        'Order Date',
        'Total Revenue',
        'Total Quantity',
        'Total Orders',
      ],
      ...csvData.map((e) => [
        e.ProductId,
        e.ProductName,
        e.StoreId,
        e.OrderDate,
        e.TotalRevenue,
        e.TotalQuantity,
        e.TotalOrders,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admin_sales_report.csv';
    a.click();
  };

  const downloadXLSX = () => {
    const xlsData = salesData.map((item) => ({
      ProductId: item.productId,
      ProductName: item.productName,
      StoreId: item.storeId,
      OrderDate: item.orderDate,
      TotalRevenue: item.totalRevenue,
      TotalQuantity: item.totalQuantity,
      TotalOrders: item.totalOrders,
    }));

    const worksheet = XLSX.utils.json_to_sheet(xlsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Report');
    XLSX.writeFile(workbook, 'admin_sales_report.xlsx');
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const columns = [
      'Product ID',
      'Product Name',
      'Store ID',
      'Order Date',
      'Total Revenue',
      'Total Quantity',
      'Total Orders',
    ];
    const rows = salesData.map((item) => [
      item.productId,
      item.productName,
      item.storeId,
      item.orderDate,
      item.totalRevenue,
      item.totalQuantity,
      item.totalOrders,
    ]);

    doc.autoTable(columns, rows);
    doc.save('admin_sales_report.pdf');
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h2>Admin Sales Report</h2>
      <div style={{ marginBottom: '20px' }}>
        <Select
          defaultValue="daily"
          onChange={setReportType}
          style={{ width: 200, marginRight: 20 }}
        >
          <Option value="daily">Daily</Option>
          <Option value="monthly">Monthly</Option>
          <Option value="yearly">Yearly</Option>
          <Option value="custom">Custom</Option>
        </Select>
        <RangePicker onChange={(dates) => setDateRange(dates)} style={{ marginRight: 20 }} />
        <Button type="primary" onClick={fetchSalesData} loading={loading}>
          Generate Report
        </Button>
      </div>

      <Table
        dataSource={salesData}
        loading={loading}
        rowKey={(record) => `${record.productId}-${record.orderDate}`}
        columns={[
          { title: 'Product ID', dataIndex: 'productId', key: 'productId' },
          { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
          { title: 'Store ID', dataIndex: 'storeId', key: 'storeId' },
          { title: 'Order Date', dataIndex: 'orderDate', key: 'orderDate' },
          { title: 'Total Revenue', dataIndex: 'totalRevenue', key: 'totalRevenue' },
          { title: 'Total Quantity', dataIndex: 'totalQuantity', key: 'totalQuantity' },
          { title: 'Total Orders', dataIndex: 'totalOrders', key: 'totalOrders' },
        ]}
        pagination={salesData.length > 0 ? { pageSize: 10 } : false}
        style={{ marginTop: 20 }}
      />

      {salesData.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Button onClick={downloadCSV}>Download CSV</Button>
          <Button onClick={downloadXLSX} style={{ marginLeft: 10 }}>
            Download XLSX
          </Button>
          <Button onClick={downloadPDF} style={{ marginLeft: 10 }}>
            Download PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminSalesReport;
