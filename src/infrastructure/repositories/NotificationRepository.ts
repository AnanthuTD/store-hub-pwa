import axiosInstance from '@/config/axios';

export enum UserRole {
  ADMIN = 'admin',
  PARTNER = 'partner',
  VENDOR = 'vendor',
  USER = 'user',
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationResponse {
  notifications: Notification[];
  total: number;
}

class NotificationRepository {
  private role: UserRole;

  constructor(role: UserRole) {
    this.role = role; // Set the role from constructor
  }

  // Fetch notifications for a specific recipient
  async getNotifications(
    page: number = 1,
    limit: number = 10,
  ): Promise<NotificationResponse | never> {
    try {
      const response = await axiosInstance.get<NotificationResponse>(
        `/${this.role}/notifications`,
        {
          params: { page, limit },
        },
      );
      return response.data; // Returns the data as defined in NotificationResponse
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUnreadNotificationCount(): Promise<number | never> {
    try {
      const response = await axiosInstance.get<NotificationResponse>(
        `/${this.role}/notifications/unread/count`,
      );
      return response.data.count;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Mark a specific notification as read
  async markAsRead(notificationId: string): Promise<Notification> {
    try {
      const response = await axiosInstance.patch<Notification>(
        `/${this.role}/notifications/${notificationId}/read`,
      );
      return response.data; // Returns the updated notification
    } catch (error) {
      this.handleError(error);
    }
  }

  // Delete a specific notification
  async deleteNotification(notificationId: string): Promise<string> {
    try {
      const response = await axiosInstance.delete<string>(
        `/${this.role}/notifications/${notificationId}`,
      );
      return response.data; // Returns a success message
    } catch (error) {
      this.handleError(error);
    }
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<string> {
    try {
      const response = await axiosInstance.patch<string>(`/${this.role}/notifications/read-all`);
      return response.data; // Returns a success message
    } catch (error) {
      this.handleError(error);
    }
  }

  // Delete all notifications
  async deleteAllNotifications(): Promise<string> {
    try {
      const response = await axiosInstance.delete<string>(`/${this.role}/notifications`);
      return response.data; // Returns a success message
    } catch (error) {
      this.handleError(error);
    }
  }

  // Centralized error handler
  private handleError(error: any): never {
    console.error(error); // You can replace this with a logging service
    const message = error.response?.data?.message || 'An error occurred. Please try again.';
    throw new Error(message);
  }
}

export default NotificationRepository;
