// components/MapWithHighlightedSegment.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import MapContainer from './MapContainer';
import DirectionsDisplay from './DirectionsDisplay';
import { Direction } from '@/presentation/layouts/DeliveryPartnerLayout/types';
import { io } from 'socket.io-client';

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
  const [waypoints, setWaypoints] = useState([]);
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(null);
  const [waypointCount, setWaypointCount] = useState<number>(0);
  const [walkingMode, setWalkingMode] = useState<boolean>(false);
  const [highlightedInstructionIndex, setHighlightedInstructionIndex] = useState(0);

  const isWithinProximity = (currentLocation, step) => {
    const stepStart = new google.maps.LatLng(
      step.startLocation.latLng.latitude,
      step.startLocation.latLng.longitude,
    );
    const stepEnd = new google.maps.LatLng(
      step.endLocation.latLng.latitude,
      step.endLocation.latLng.longitude,
    );

    const currentLatLng = new google.maps.LatLng(currentLocation.lat, currentLocation.lng);

    const distanceToStart = google.maps.geometry.spherical.computeDistanceBetween(
      currentLatLng,
      stepStart,
    );
    const distanceToEnd = google.maps.geometry.spherical.computeDistanceBetween(
      currentLatLng,
      stepEnd,
    );

    return distanceToStart <= REACH_DISTANCE_THRESHOLD || distanceToEnd <= REACH_DISTANCE_THRESHOLD;
  };

  const updateHighlightedStep = (currentLocation, steps) => {
    for (let i = 0; i < steps.length; i++) {
      if (isWithinProximity(currentLocation, steps[i])) {
        setHighlightedInstructionIndex(i); // Update the state to highlight the current instruction
        break; // Exit the loop once a step is highlighted
      }
    }
  };

  const updateLocation = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const loc = { lat: latitude, lng: longitude };
    setCurrentLocation(loc);
    directions && updateHighlightedStep(loc, directions.routes[0].legs[waypointCount].steps);

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
    // if (currentLocation) {
    const fetchDirections = async () => {
      try {
        const orderDetailsAndDirections = localStorage.getItem('orderDetailsAndDirection');
        if (!orderDetailsAndDirections) {
          throw new Error('OrderDetails and directions are not found in localStorage');
        }
        const { direction }: { direction: Direction } = JSON.parse(orderDetailsAndDirections);

        direction.routes[0].legs.forEach((leg) => {
          // if (index === 0) return;
          const coordinates = {
            lat: leg.startLocation.latLng.latitude,
            lng: leg.startLocation.latLng.longitude,
          };
          console.log(coordinates);

          setWaypoints((prev) => [...prev, coordinates]);
        });

        console.log('direction: ', direction);

        setDirections(direction);
        setCurrentWaypointIndex(direction.routes[0].optimizedIntermediateWaypointIndex[0]);
      } catch (error) {
        console.error('Error fetching directions:', error);
        alert('Failed to fetch directions. Please try again.');
      }
    };

    fetchDirections();
    // }
  }, []);

  const handleMarkerDragEnd = (event) => {
    const newLocation = {
      coords: { latitude: event.latLng.lat(), longitude: event.latLng.lng() },
    };
    console.log('newLocation: ', newLocation);

    updateLocation(newLocation);
  };

  const getPolylineForCurrentSegment = () => {
    if (
      directions &&
      currentWaypointIndex !== null &&
      waypointCount < directions.routes[0].legs.length
    ) {
      const leg = directions.routes[0].legs[waypointCount];

      // Extract encoded polylines from steps
      return google.maps.geometry.encoding.decodePath(leg.polyline.encodedPolyline);
    }
    return null;
  };

  const getFullRoutePolyline = () => {
    if (directions) {
      return google.maps.geometry.encoding.decodePath(
        directions.routes[0].polyline.encodedPolyline,
      );
    }
    return null;
  };

  useEffect(() => {
    socket.emit('emit:location', {
      location: currentLocation,
      orderId: 'orderId',
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
        getPolylineForCurrentSegment={getPolylineForCurrentSegment}
        getFullRoutePolyline={getFullRoutePolyline}
      />
      {directions ? <DirectionsRenderer directions={directions} routeIndex={0} /> : null}
      <DirectionsDisplay
        directions={directions}
        currentWaypointIndex={currentWaypointIndex}
        highlightedInstructionIndex={highlightedInstructionIndex}
      />
    </div>
  ) : null;
};

export default MapWithHighlightedSegment;

// https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRenderer
