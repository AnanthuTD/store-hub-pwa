import { GoogleMap, MarkerF, Polyline, InfoWindow } from '@react-google-maps/api';
import React, { useState, useCallback, useEffect } from 'react';

// Types
type LatLngLiteral = google.maps.LatLngLiteral;
type MapProps = {
  currentLocation: LatLngLiteral;
  waypoints: LatLngLiteral[];
  onMarkerDragEnd: (e: google.maps.MapMouseEvent) => void;
  selectedWaypoint: number | null;
  setSelectedWaypoint: React.Dispatch<React.SetStateAction<number | null>>;
  directions: google.maps.DirectionsResult | null;
  getPolylineForCurrentSegment: () => LatLngLiteral[] | null;
  getFullRoutePolyline: () => LatLngLiteral[] | null;
};

const MapContainer: React.FC<MapProps> = ({
  currentLocation,
  waypoints,
  onMarkerDragEnd,
  selectedWaypoint,
  setSelectedWaypoint,
  getPolylineForCurrentSegment,
  getFullRoutePolyline,
}) => {
  const fullRoutePolyline = getFullRoutePolyline();
  const currentSegmentPolyline = getPolylineForCurrentSegment();
  console.log(fullRoutePolyline, currentSegmentPolyline);

  const [map, setMap] = useState<google.maps.Map | null>(null); // Correct type for Google Map
  const [heading, setHeading] = useState<number>(320);
  const [tilt, setTilt] = useState<number>(100);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);

  // Debounce the heading updates to avoid excessive renders

  // Handle device orientation and update heading smoothly
  useEffect(() => {
    let headingTimeout: number;
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        // Calculate the minimal angular difference
        let difference = Math.abs((event.alpha - deviceHeading + 360) % 360);
        if (difference > 180) {
          difference = 360 - difference; // Choose the smaller rotation (clockwise or counterclockwise)
        }

        // Only update heading if the change is considerable
        if (difference >= 1) {
          clearTimeout(headingTimeout); // Clear previous timeout
          headingTimeout = setTimeout(() => {
            setDeviceHeading(event.alpha!); // Ensure alpha is not null with !
            console.log('Orientation changed: ', event.alpha);
          }, 100); // Adding a debounce of 100ms
        }
      }
    };

    window.addEventListener('deviceorientationabsolute', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
    };
  }, [deviceHeading]);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  // Recenter the map and smoothly rotate it based on device heading
  const recenterMap = useCallback(() => {
    if (map && currentLocation) {
      map.panTo(currentLocation);
      map.setZoom(18);

      // Smoothly rotate map to device heading
      map.setHeading(360 - deviceHeading);
    }
  }, [map, currentLocation, deviceHeading]);

  const adjustMap = (mode: 'tilt' | 'rotate', amount: number) => {
    if (map) {
      switch (mode) {
        case 'tilt':
          const newTilt = (map.getTilt() || 0) + amount;
          map.setTilt(newTilt);
          setTilt(newTilt);
          break;
        case 'rotate':
          const newHeading = (map.getHeading() || 0) + amount;
          map.setHeading(newHeading);
          setHeading(360 - newHeading);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      <GoogleMap
        onLoad={onLoad}
        zoom={16}
        options={{
          heading: heading,
          tilt: tilt,
          mapId: '90f87356969d889c',
        }}
        mapContainerStyle={{ height: '500px', width: '100%' }}
      >
        {/* Full Route Polyline */}
        {fullRoutePolyline && fullRoutePolyline.length && (
          <Polyline
            path={fullRoutePolyline}
            options={{
              strokeColor: '#808080',
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
            visible={true}
          />
        )}

        {/* Highlighted Polyline for the current segment */}
        {currentSegmentPolyline && (
          <Polyline
            path={currentSegmentPolyline}
            options={{
              strokeColor: '#0000FF',
              strokeOpacity: 0.9,
              strokeWeight: 6,
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
        <button onClick={() => adjustMap('tilt', 20)}>Tilt Down</button>
        <button onClick={() => adjustMap('tilt', -20)}>Tilt Up</button>
        <button onClick={recenterMap}>Recenter & Zoom In</button>
      </div>
    </div>
  );
};

export default MapContainer;
