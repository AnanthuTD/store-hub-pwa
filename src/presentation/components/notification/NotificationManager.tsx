import React, { useEffect, useMemo, useState } from 'react';
import { Table, Button, Popconfirm, message, Typography, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';

import './NotificationManager.css';
import NotificationRepository, {
  UserRole,
} from '@/infrastructure/repositories/NotificationRepository';
import { useNotification } from '../NotificationContext';

const { Text } = Typography;

const NotificationManager: React.FC<{ role: UserRole }> = ({ role }) => {
  const notificationRepo = useMemo(() => new NotificationRepository(role), [role]);
  const { refreshUnreadNotificationCount } = useNotification();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    fetchNotifications();
  }, [page, pageSize]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { notifications: data, total: totalCount } = await notificationRepo.getNotifications(
        page,
        pageSize,
      ); // Assume the API returns data and totalCount
      setNotifications(data);
      setTotal(totalCount);
    } catch (error) {
      message.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationRepo.markAsRead(id);
      message.success('Notification marked as read');
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      message.error('Failed to mark notification as read');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await notificationRepo.deleteNotification(id); // Assume deleteNotification is an API call
      message.success('Notification deleted successfully');
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      message.error('Failed to delete notification');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationRepo.markAllAsRead(); // Assume markAllAsRead is an API call
      message.success('All notifications marked as read');
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      message.error('Failed to mark all notifications as read');
    }
  };

  const handleDeleteAll = async () => {
    try {
      await notificationRepo.deleteAllNotifications(); // Assume deleteAllNotifications is an API call
      message.success('All notifications deleted successfully');
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      message.error('Failed to delete all notifications');
    }
  };

  useEffect(() => {
    refreshUnreadNotificationCount();
  }, [notifications]);

  const columns: ColumnsType<any> = [
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Status',
      dataIndex: 'readStatus',
      key: 'read',
      render: (text: boolean) => (text ? 'Read' : 'Unread'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button onClick={() => handleMarkAsRead(record._id)}>Mark as Read</Button>
          <Popconfirm
            title="Are you sure you want to delete this notification?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowClassName = (record: any) => {
    return record.readStatus ? 'read-notification' : ''; // Apply 'read-notification' class if read
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.shiftKey && event.key === 'U') {
      handleMarkAllAsRead();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className="pro-tips">
        <Text type="secondary">Pro Tips:</Text>
        <Text type="warning">
          Press <strong>Shift + U</strong> to mark all as read
        </Text>
      </div>
      <Table
        columns={columns}
        dataSource={notifications}
        rowClassName={rowClassName}
        pagination={{
          current: page,
          pageSize,
          total,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        loading={loading}
      />
      <Button onClick={handleMarkAllAsRead} style={{ marginRight: 8 }}>
        Mark All as Read
      </Button>
      <Popconfirm
        title="Are you sure you want to delete all notifications?"
        onConfirm={handleDeleteAll}
      >
        <Button danger>Delete All</Button>
      </Popconfirm>
    </div>
  );
};

export default NotificationManager;
