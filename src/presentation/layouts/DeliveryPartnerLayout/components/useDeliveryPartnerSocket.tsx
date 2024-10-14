import { useEffect, useRef } from 'react';
import getDistance from 'geolib/es/getPreciseDistance';
import {
  deliveryPartnerSocket,
  DeliveryPartnerSocketEvents,
} from '@/infrastructure/socket/deliveryPartnerSocket';
import { OrderDetailsAndDirection } from '../../pages/partner/direction/types';
import { useNavigate } from 'react-router-dom';

interface CoordinatesInterface {
  latitude: number;
  longitude: number;
}

interface OrderAlert {
  // Define the structure of the order alert here
}

export const useDeliveryPartnerSocket = (setNewOrder: (order: OrderAlert | null) => void) => {
  const previousLocationRef = useRef<CoordinatesInterface | null>(null);
  const DISTANCE_THRESHOLD = 5; // Distance threshold in meters
  const navigate = useNavigate();

  useEffect(() => {
    const handleOrderAlert = (orderAlert: OrderAlert) => {
      console.log('Order alert:', orderAlert);
      setNewOrder(orderAlert);
    };

    const handleOrderAccepted = (OrderAccepted) => {
      console.log('Order accepted:', OrderAccepted);
      setNewOrder(null);
    };

    const handleOrderDetails = (orderDetailsAndDirection: OrderDetailsAndDirection) => {
      console.log(orderDetailsAndDirection);

      try {
        localStorage.setItem('orderDetailsAndDirection', JSON.stringify(orderDetailsAndDirection));
      } catch (error) {
        console.error('Failed to save order details to local storage:', error);
      }

      // Navigate to the direction page
      navigate('/partner/direction');
    };

    deliveryPartnerSocket.on(DeliveryPartnerSocketEvents.OrderAlert, handleOrderAlert);
    deliveryPartnerSocket.on(DeliveryPartnerSocketEvents.OrderAccepted, handleOrderAccepted);
    deliveryPartnerSocket.on(DeliveryPartnerSocketEvents.OrderDetails, handleOrderDetails);

    function updateLocation({ latitude, longitude }: CoordinatesInterface) {
      deliveryPartnerSocket.emit(DeliveryPartnerSocketEvents.LocationUpdate, {
        latitude,
        longitude,
      });
    }

    const watchPositionSuccess = (position: GeolocationPosition) => {
      console.log('Location updated');
      let { longitude: currentLongitude, latitude: currentLatitude } = position.coords;

      // TODO: remove this
      // currentLongitude = 76.3579401; // Simulated longitude
      // currentLatitude = 10.0037578; // Simulated latitude

      if (previousLocationRef.current) {
        const distance = getDistance(previousLocationRef.current, {
          latitude: currentLatitude,
          longitude: currentLongitude,
        });

        if (distance > DISTANCE_THRESHOLD) {
          updateLocation({ latitude: currentLatitude, longitude: currentLongitude });
        }
      } else {
        updateLocation({ latitude: currentLatitude, longitude: currentLongitude });
      }
      previousLocationRef.current = { latitude: currentLatitude, longitude: currentLongitude };
    };

    const watchPositionError = (error: GeolocationPositionError) => {
      console.error('Error getting location:', error.message);
    };

    navigator.geolocation.watchPosition(watchPositionSuccess, watchPositionError, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    });

    // Cleanup function to remove listeners
    return () => {
      deliveryPartnerSocket.off(DeliveryPartnerSocketEvents.OrderAlert, handleOrderAlert);
      deliveryPartnerSocket.off(DeliveryPartnerSocketEvents.OrderAccepted, handleOrderAccepted);
      deliveryPartnerSocket.off(DeliveryPartnerSocketEvents.OrderDetails, handleOrderDetails);
    };
  }, [setNewOrder, navigate]);
};
