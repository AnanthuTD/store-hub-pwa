import { GoogleMap, MarkerF, Polyline, InfoWindow } from '@react-google-maps/api';
import React, { useState, useCallback, useEffect } from 'react';
import { Direction } from '../types';

// Types
type LatLngLiteral = google.maps.LatLngLiteral;
type MapProps = {
  currentLocation: LatLngLiteral;
  waypoints: LatLngLiteral[];
  onMarkerDragEnd: (e: google.maps.MapMouseEvent) => void;
  selectedWaypoint: number | null;
  setSelectedWaypoint: React.Dispatch<React.SetStateAction<number | null>>;
  directions: Direction;
};

const MapContainer: React.FC<MapProps> = ({
  currentLocation,
  waypoints,
  onMarkerDragEnd,
  selectedWaypoint,
  setSelectedWaypoint,
  directions,
  deliveryDirection,
}) => {
  const [polyline, setPolyline] = useState<LatLngLiteral[] | null>(null); // Direct type use
  const [map, setMap] = useState<google.maps.Map | null>(null); // Correct type for Google Map
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [tilt, setTilt] = useState<number>(45); // Adjust default tilt

  // Utility function to decode polyline from directions
  const decodePolyline = useCallback((directions) => {
    if (directions) {
      const polylineStr = directions.routes[0].polyline.encodedPolyline;

      console.log(google.maps.geometry.encoding.decodePath(polylineStr));
      return google.maps.geometry.encoding.decodePath(polylineStr);
    }
    return null;
  }, []);

  // Effect to update polyline when directions change
  useEffect(() => {
    const newPolyline = decodePolyline(directions);
    setPolyline(newPolyline);
  }, [directions, decodePolyline]);

  // Handle device orientation
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setDeviceHeading((prev) => {
          const difference = Math.abs((event.alpha! - prev + 360) % 360);
          return difference > 180 ? 360 - difference : difference;
        });
      }
    };
    window.addEventListener('deviceorientationabsolute', handleOrientation);
    return () => window.removeEventListener('deviceorientationabsolute', handleOrientation);
  }, []);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  // Recenter map and apply rotation based on device heading
  const recenterMap = useCallback(() => {
    if (map && currentLocation) {
      map.panTo(currentLocation);
      map.setZoom(100);
      map.setHeading(360 - deviceHeading);
    }
  }, [map, currentLocation, deviceHeading]);

  // Adjust map rotation and tilt
  const adjustMap = (mode: 'tilt' | 'rotate', amount: number) => {
    if (map) {
      if (mode === 'tilt') {
        const newTilt = Math.max(0, Math.min(67.5, (map.getTilt() || 0) + amount)); // Safeguard tilt between 0 and 67.5
        map.setTilt(newTilt);
        setTilt(newTilt);
      } else if (mode === 'rotate') {
        const newHeading = (map.getHeading() || 0) + amount;
        map.setHeading(newHeading);
        setDeviceHeading(360 - newHeading);
      }
    }
  };

  return (
    <div>
      <GoogleMap
        onLoad={onLoad}
        zoom={100}
        options={{
          heading: 360 - deviceHeading,
          tilt: tilt,
          mapId: '90f87356969d889c',
        }}
        mapContainerStyle={{ height: '500px', width: '100%' }}
      >
        {/* Full Route Polyline */}
        {!decodePolyline(deliveryDirection)?.length && polyline && polyline.length > 0 && (
          <Polyline
            path={decodePolyline(directions)}
            options={{
              strokeColor: '#0000FF',
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />
        )}

        {decodePolyline(deliveryDirection)?.length && (
          <Polyline
            path={decodePolyline(deliveryDirection)}
            options={{
              strokeColor: '#0000FF',
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />
        )}

        {/* Custom Vehicle Marker */}
        <MarkerF
          position={currentLocation}
          label="You"
          icon={{
            url: '/delivery/car.png',
            scaledSize: new google.maps.Size(50, 50),
            anchor: new google.maps.Point(25, 25),
          }}
          draggable
          onDragEnd={onMarkerDragEnd}
        />

        {/* Waypoint Markers */}
        {waypoints.map((waypoint, index) => (
          <MarkerF
            key={index}
            position={waypoint}
            onClick={() => setSelectedWaypoint(index)}
            label={`Waypoint ${index + 1}`}
          />
        ))}

        {selectedWaypoint !== null && (
          <InfoWindow
            position={waypoints[selectedWaypoint]}
            onCloseClick={() => setSelectedWaypoint(null)}
          >
            <div>
              <h3>Waypoint {selectedWaypoint + 1}</h3>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Control Buttons */}
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => adjustMap('rotate', 20)}>Rotate Left</button>
        <button onClick={() => adjustMap('rotate', -20)}>Rotate Right</button>
        <button onClick={() => adjustMap('tilt', 10)}>Tilt Down</button>
        <button onClick={() => adjustMap('tilt', -10)}>Tilt Up</button>
        <button onClick={recenterMap}>Recenter & Zoom In</button>
      </div>
    </div>
  );
};

export default MapContainer;
