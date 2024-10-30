import React, { useState } from 'react';
import { Table, Button, DatePicker, Select, message, Space, Typography, Row, Col } from 'antd';
import axiosInstance from '@/config/axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;

const AdminSalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState([null, null]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalDiscounts, setTotalDiscounts] = useState(0);
  const [platformFees, setPlatformFees] = useState(0);

  const fetchSalesData = async () => {
    setLoading(true);
    const [startDate, endDate] = dateRange.map((date) => date?.toISOString());

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
        setTotalSales(response.data.totalSales);
        setTotalDiscounts(response.data.totalDiscountsGiven);
        setPlatformFees(response.data.totalPlatformFeesCollected);
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
    const csvContent = [
      ['Summary'],
      ['Total Sales', `₹${totalSales.toFixed(2)}`],
      ['Total Discounts Given', `₹${totalDiscounts.toFixed(2)}`],
      ['Total Platform Fees Collected', `₹${platformFees.toFixed(2)}`],
      [],
      [
        'Product Name',
        'Store Name',
        'Order Date',
        'Total Revenue',
        'Total Quantity',
        'Total Orders',
        'Total Discount',
        'Platform Fees',
      ],
      ...salesData.map((item) => [
        item.productName,
        item.storeName,
        item.orderDate,
        item.totalRevenue,
        item.totalQuantity,
        item.totalOrders,
        item.totalDiscount,
        item.totalPlatformFees,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admin_sales_report.csv';
    a.click();
  };

  const downloadXLSX = () => {
    const summarySheet = [
      { A: 'Summary', B: '' },
      { A: 'Total Sales', B: `₹${totalSales.toFixed(2)}` },
      { A: 'Total Discounts Given', B: `₹${totalDiscounts.toFixed(2)}` },
      { A: 'Total Platform Fees Collected', B: `₹${platformFees.toFixed(2)}` },
      {},
    ];

    const dataSheet = salesData.map((item) => ({
      ProductName: item.productName,
      StoreId: item.storeName,
      OrderDate: item.orderDate,
      TotalRevenue: item.totalRevenue,
      TotalQuantity: item.totalQuantity,
      TotalOrders: item.totalOrders,
      TotalDiscount: item.totalDiscount,
      PlatformFees: item.totalPlatformFees,
    }));

    const workbook = XLSX.utils.book_new();
    const summaryWS = XLSX.utils.json_to_sheet(summarySheet, { skipHeader: true });
    const dataWS = XLSX.utils.json_to_sheet(dataSheet);

    XLSX.utils.book_append_sheet(workbook, summaryWS, 'Summary');
    XLSX.utils.book_append_sheet(workbook, dataWS, 'Sales Report');
    XLSX.writeFile(workbook, 'admin_sales_report.xlsx');
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Admin Sales Report', 14, 15);

    doc.autoTable({
      startY: 20,
      head: [['Summary', '']],
      body: [
        ['Total Sales', `₹${totalSales.toFixed(2)}`],
        ['Total Discounts Given', `₹${totalDiscounts.toFixed(2)}`],
        ['Total Platform Fees Collected', `₹${platformFees.toFixed(2)}`],
      ],
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [
        [
          'Product Name',
          'Store Name',
          'Order Date',
          'Total Revenue',
          'Total Quantity',
          'Total Orders',
          'Total Discount',
          'Platform Fees',
        ],
      ],
      body: salesData.map((item) => [
        item.productName,
        item.storeName,
        item.orderDate,
        item.totalRevenue,
        item.totalQuantity,
        item.totalOrders,
        item.totalDiscount,
        item.totalPlatformFees,
      ]),
    });

    doc.save('admin_sales_report.pdf');
  };

  return (
    <div style={{ padding: '30px', background: '#f5f5f5', borderRadius: '8px' }}>
      <Title level={2}>Admin Sales Report</Title>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col>
          <Select defaultValue="daily" onChange={setReportType} style={{ width: 200 }}>
            <Option value="daily">Daily</Option>
            <Option value="monthly">Monthly</Option>
            <Option value="yearly">Yearly</Option>
            <Option value="custom">Custom</Option>
          </Select>
        </Col>
        <Col>
          <RangePicker onChange={(dates) => setDateRange(dates)} />
        </Col>
        <Col>
          <Button type="primary" onClick={fetchSalesData} loading={loading}>
            Generate Report
          </Button>
        </Col>
      </Row>

      <div style={{ marginBottom: '20px' }}>
        <Title level={3}>Summary</Title>
        <Text>Total Sales: ₹{totalSales.toFixed(2)}</Text>
        <br />
        <Text>Total Discounts Given: ₹{totalDiscounts.toFixed(2)}</Text>
        <br />
        <Text>Total Platform Fees Collected: ₹{platformFees.toFixed(2)}</Text>
      </div>

      <Table
        dataSource={salesData}
        loading={loading}
        rowKey={(record) => `${record.productId}-${record.orderDate}`}
        columns={[
          { title: 'Product Name', dataIndex: 'productName' },
          { title: 'Store Name', dataIndex: 'storeName' },
          { title: 'Order Date', dataIndex: 'orderDate' },
          { title: 'Total Revenue', dataIndex: 'totalRevenue' },
          { title: 'Total Quantity', dataIndex: 'totalQuantity' },
          { title: 'Total Orders', dataIndex: 'totalOrders' },
          { title: 'Total Discount', dataIndex: 'totalDiscount' },
          { title: 'Platform Fees', dataIndex: 'totalPlatformFees' },
        ]}
        pagination={salesData.length > 0 ? { pageSize: 10 } : false}
      />

      {salesData.length > 0 && (
        <Space style={{ marginTop: 20 }}>
          <Button onClick={downloadCSV}>Download CSV</Button>
          <Button onClick={downloadXLSX}>Download XLSX</Button>
          <Button onClick={downloadPDF}>Download PDF</Button>
        </Space>
      )}
    </div>
  );
};

export default AdminSalesReport;
