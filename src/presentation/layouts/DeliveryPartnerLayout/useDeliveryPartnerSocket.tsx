import { useEffect, useRef } from 'react';
import { socket } from './socket';
import getDistance from 'geolib/es/getPreciseDistance';

interface CoordinatesInterface {
  latitude: number;
  longitude: number;
}

export const useDeliveryPartnerSocket = (setNewOrder: (order: any) => void) => {
  const previousLocationRef = useRef<CoordinatesInterface | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to /deliveryPartner namespace with authToken');
    });

    socket.on('connect_error', (error) => {
      console.log('Connection error:', error.message);
    });

    socket.on('order-alert', (orderAlert) => {
      console.log('Order alert:', orderAlert);
      setNewOrder(orderAlert);
    });

    socket.on('order-accepted', (orderAccepted) => {
      console.log('Order accepted:', orderAccepted);
      setNewOrder(null);
    });

    function updateLocation({ latitude, longitude }: CoordinatesInterface) {
      socket.emit('locationUpdate', {
        latitude,
        longitude,
      });
    }

    navigator.geolocation.watchPosition(
      (position) => {
        console.log('Location updated');
        let { longitude: currentLongitude, latitude: currentLatitude } = position.coords;

        // TODO: remove this
        (currentLongitude = 76.3579401), (currentLatitude = 10.0037578);

        if (previousLocationRef.current) {
          const distance = getDistance(
            {
              latitude: previousLocationRef.current.latitude,
              longitude: previousLocationRef.current.longitude,
            },
            { latitude: currentLatitude, longitude: currentLongitude },
          );

          if (distance > 5) {
            updateLocation({ latitude: currentLatitude, longitude: currentLongitude });
          }
          previousLocationRef.current = { latitude: currentLatitude, longitude: currentLongitude };
        } else {
          updateLocation({ latitude: currentLatitude, longitude: currentLongitude });
          previousLocationRef.current = { latitude: currentLatitude, longitude: currentLongitude };
        }
      },
      () => {},
      {
        enableHighAccuracy: true,
        // timeout: 5000,
        maximumAge: 0,
      },
    );

    return () => {
      socket.off('order-alert');
    };
  }, [setNewOrder]);
};
