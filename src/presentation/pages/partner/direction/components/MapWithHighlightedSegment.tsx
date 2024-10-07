// components/MapWithHighlightedSegment.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import MapContainer from './MapContainer';
import { Direction } from '@/presentation/pages/partner/direction/types';
import { io } from 'socket.io-client';
import OrderDetails from './OrderDetails';

const socket = io('http://localhost:4000/track');

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_MAP_API_KEY;
const REACH_DISTANCE_THRESHOLD = 50;

const MapWithHighlightedSegment = () => {
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
  const [walkingMode, setWalkingMode] = useState<boolean>(false);
  // const [highlightedInstructionIndex, setHighlightedInstructionIndex] = useState(0);

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
            alert('You have reached the final destination!');
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
          alert('Unable to retrieve your location.');
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
        const { direction }: { direction: Direction } = JSON.parse(orderDetailsAndDirections);

        setDirections(direction);
      } catch (error) {
        console.error('Error fetching directions:', error);
        alert('Failed to fetch directions. Please try again.');
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
    socket.emit('emit:location', {
      location: currentLocation,
      orderId: '66f6f2f973ee00f755f395e4',
      duration: directions?.routes[0].duration,
      polyline: directions?.routes[0].polyline.encodedPolyline,
      distance: directions?.routes[0].distanceMeters,
    });
  }, [currentLocation]);

  return isLoaded && waypoints.length ? (
    <div>
      <h2>Route with Highlighted Waypoint Segment</h2>
      <label>
        <input
          type="checkbox"
          checked={walkingMode}
          onChange={(e) => setWalkingMode(e.target.checked)}
        />
        Walking Directions
      </label>
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

export default MapWithHighlightedSegment;

// https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRenderer
