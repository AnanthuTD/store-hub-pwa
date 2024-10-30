// components/MapWithHighlightedSegment.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import MapContainer from './MapContainer';
import { Direction } from '@/presentation/pages/partner/direction/types';
import { io } from 'socket.io-client';
import OrderDetails from './OrderDetails';
import { useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';
import { message } from 'antd';

const socket = io(`${import.meta.env.VITE_API_BASE_URL}/track`);

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_MAP_API_KEY;
const REACH_DISTANCE_THRESHOLD = 50;

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState<Direction | null>(null);
  const [deliveryDirection, setDeliveryDirection] = useState<Direction | null>(null);
  const [waypoints, setWaypoints] = useState([]);
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(null);
  const [waypointCount, setWaypointCount] = useState<number>(0);
  const [orderId, setOrderId] = useState(null);
  const partnerId = useSelector((state: RootState) => state.partner.data.id);

  const updateLocation = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const loc = { lat: latitude, lng: longitude };
    setCurrentLocation(loc);

    // Check if the user is close to the current waypoint
    if (currentWaypointIndex !== null && waypoints[currentWaypointIndex]) {
      const distanceToWaypoint = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(latitude, longitude),
        new google.maps.LatLng(
          waypoints[currentWaypointIndex].lat,
          waypoints[currentWaypointIndex].lng,
        ),
      );

      if (distanceToWaypoint <= REACH_DISTANCE_THRESHOLD) {
        const shouldStartNextNavigation = window.confirm(
          'You have reached your waypoint. Would you like to navigate to the next waypoint?',
        );

        if (shouldStartNextNavigation) {
          if (waypointCount < waypoints.length) {
            setWaypointCount((prev) => prev + 1);
            setCurrentWaypointIndex(
              directions.routes[0].optimizedIntermediateWaypointIndex[waypointCount + 1],
            );
          } else {
            message.info('You have reached the final destination!');
          }
        }
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLocation(position);
        },
        (error) => {
          console.error(error);
          message.error('Unable to retrieve your location.');
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        },
      );
    }
  }, []);

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const orderDetailsAndDirections = localStorage.getItem('orderDetailsAndDirection');
        if (!orderDetailsAndDirections) {
          throw new Error('OrderDetails and directions are not found in localStorage');
        }
        const { direction, order }: { direction: Direction } =
          JSON.parse(orderDetailsAndDirections);

        setOrderId(order._id);
        setDirections(direction);
      } catch (error) {
        console.error('Error fetching directions:', error);
        message.error('Failed to fetch directions. Please try again.');
      }
    };

    fetchDirections();
    // }
  }, []);

  useEffect(() => {
    const coordinates = {
      lat: directions?.routes[0].legs[0].endLocation.latLng.latitude,
      lng: directions?.routes[0].legs[0].endLocation.latLng.longitude,
    };
    setWaypoints([coordinates]);
  }, [directions]);

  useEffect(() => {
    const coordinates = {
      lat: deliveryDirection?.routes[0].legs[0].endLocation.latLng.latitude,
      lng: deliveryDirection?.routes[0].legs[0].endLocation.latLng.longitude,
    };
    setWaypoints([coordinates]);
  }, [deliveryDirection]);

  const handleMarkerDragEnd = (event) => {
    const newLocation = {
      coords: { latitude: event.latLng.lat(), longitude: event.latLng.lng() },
    };
    console.log('newLocation: ', newLocation);

    updateLocation(newLocation);
  };

  useEffect(() => {
    console.log(waypoints);
    const d = deliveryDirection ? deliveryDirection : directions;

    socket.emit('emit:location', {
      destinationLocation: waypoints[0],
      location: currentLocation,
      orderId,
      duration: d?.routes[0].duration,
      polyline: d?.routes[0].polyline.encodedPolyline,
      distance: d?.routes[0].distanceMeters,
      partnerId,
    });
  }, [currentLocation, orderId, partnerId]);

  return isLoaded && waypoints.length ? (
    <div>
      <MapContainer
        currentLocation={currentLocation}
        waypoints={waypoints}
        onMarkerDragEnd={handleMarkerDragEnd}
        selectedWaypoint={selectedWaypoint}
        setSelectedWaypoint={setSelectedWaypoint}
        directions={directions}
        deliveryDirection={deliveryDirection}
      />

      <OrderDetails
        distance={directions?.routes[0].distanceMeters}
        duration={directions?.routes[0].duration}
        setDirection={setDeliveryDirection}
      />
    </div>
  ) : null;
};

export default Map;

// https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRenderer
