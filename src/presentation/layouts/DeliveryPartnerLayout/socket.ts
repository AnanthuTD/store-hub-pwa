import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

function getCookies() {
  return Cookies.get('authToken');
}

export const socket = io(import.meta.env.VITE_API_BASE_URL + '/deliveryPartner', {
  auth: {
    token: getCookies(),
  },
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected to /deliveryPartner namespace');
});
