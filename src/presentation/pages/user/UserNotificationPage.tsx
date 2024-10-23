import { UserRole } from '@/infrastructure/repositories/NotificationRepository';
import NotificationManager from '@/presentation/components/notification/NotificationManager';
import React from 'react';

function NotificationPage() {
  return <NotificationManager role={UserRole.USER} />;
}

export default NotificationPage;
