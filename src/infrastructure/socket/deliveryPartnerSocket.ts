import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

export function getCookies() {
  return Cookies.get('authToken');
}

export const deliveryPartnerSocket = io(import.meta.env.VITE_API_BASE_URL + '/deliveryPartner', {
  auth: {
    token: getCookies(),
  },
  transports: ['websocket'],
});

deliveryPartnerSocket.on('connect', () => {
  console.log('Connected to /deliveryPartner namespace');
});

deliveryPartnerSocket.on('connect_error', (error) => {
  console.log('Connection error:', error.message);
});

export enum DeliveryPartnerSocketEvents {
  OrderAccepted = 'order:accepted',
  LocationUpdate = 'location:update',
  OrderAlert = 'order:alert',
  OrderAlertRemoved = 'order:alert:removed',
  OrderDetails = 'accepted:order:details',
}
