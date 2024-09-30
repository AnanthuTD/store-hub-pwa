import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  GoogleMap,
  MarkerF,
  Autocomplete,
  useJsApiLoader,
  Libraries,
} from '@react-google-maps/api';
import { Button, Input, InputRef, notification } from 'antd';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 20.5937, // Default to India's lat
  lng: 78.9629, // Default to India's lng
};

const libraries: Libraries = ['places'];

interface MyComponentProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  selectedLocation: { lat: number; lng: number } | null;
}

function MyComponent({ onLocationSelect, selectedLocation }: MyComponentProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY, // Replace with your Google Maps API key
    libraries: libraries, // Required for Places Autocomplete
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
    selectedLocation,
  );
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(
    selectedLocation,
  );
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const searchInputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (markerPosition) onLocationSelect(markerPosition);
  }, [markerPosition, onLocationSelect]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Get user's current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const userLocation = { lat, lng };

          setCurrentLocation(userLocation);
          setMarkerPosition(userLocation);

          // Center the map on user's current location
          if (map) {
            map.panTo(userLocation);
            map.setZoom(15);
          }

          notification.success({
            message: 'Location Fetched',
            description: `Current location: Latitude ${lat}, Longitude ${lng}`,
          });
        },
        (error) => {
          console.error('Error fetching location:', error);
          notification.error({
            message: 'Error',
            description: 'Failed to retrieve your current location.',
          });
        },
        {
          enableHighAccuracy: true,
        },
      );
    } else {
      notification.error({
        message: 'Geolocation not supported',
        description: 'Your browser does not support geolocation.',
      });
    }
  };

  // Handle map clicks to set marker
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      setMarkerPosition({ lat, lng });

      notification.info({
        message: 'Location Selected',
        description: `Selected location: Latitude ${lat}, Longitude ${lng}`,
      });
    }
  };

  // Set the autocomplete instance
  const onAutocompleteLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  // Handle place selection from autocomplete
  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setMarkerPosition({ lat, lng });
        map?.panTo({ lat, lng });
        map?.setZoom(15); // Zoom in to the selected place

        notification.success({
          message: 'Location Selected',
          description: `Selected place: Latitude ${lat}, Longitude ${lng}`,
        });
      }
    }
  };

  return isLoaded ? (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={handlePlaceChanged}>
          <Input.Search ref={searchInputRef} placeholder="Search location..." />
        </Autocomplete>
      </div>

      <Button onClick={handleCurrentLocation} type="primary" style={{ marginBottom: 16 }}>
        Get Current Location
      </Button>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation || defaultCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {markerPosition && <MarkerF position={markerPosition} />}
      </GoogleMap>

      {markerPosition && (
        <div style={{ marginTop: 16 }}>
          <p>
            <strong>Selected Coordinates:</strong> Latitude {markerPosition.lat}, Longitude{' '}
            {markerPosition.lng}
          </p>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
