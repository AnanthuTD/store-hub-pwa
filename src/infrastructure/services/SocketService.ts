import { io, Socket } from 'socket.io-client';

export class SocketService {
  private socket: Socket;

  constructor(userId) {
    console.log(import.meta.env.VITE_API_BASE_URL + '/call');
    this.socket = io(import.meta.env.VITE_API_BASE_URL + '/call', {
      auth: {
        token: userId,
      },
      transports: ['websocket'],
    });
  }

  on(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  off(event: string): void {
    this.socket.off(event);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
