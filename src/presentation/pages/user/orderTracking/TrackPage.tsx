'use client';
import { useEffect, useState, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  // DirectionsRenderer,
  useLoadScript,
  Polyline,
} from '@react-google-maps/api';
import io from 'socket.io-client';
import { Card, Typography, Progress, Row, Col, message } from 'antd';

const { Title, Text } = Typography;

// Socket connection to the /track namespace
const socket = io('http://localhost:4000/track');

const lerp = (start: number, end: number, t: number) => start + (end - start) * t; // Linear interpolation function

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_MAP_API_KEY;

const TrackPage = ({ orderId = 'orderId' }: { orderId: string }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [markerPosition, setMarkerPosition] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [targetPosition, setTargetPosition] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });
  // const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [eta, setEta] = useState<number>(0); // Estimated time of arrival (in minutes)
  // const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [polyline, setPolyline] = useState([]);

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Join the specific order room for tracking
    socket.emit('track:order', orderId);

    // Listen for real-time location updates from the server
    socket.on('location:update', (data) => {
      const { location, duration, polyline, distance } = data;
      message.success('Location update received');
      setTargetPosition(location); // Update target position with new location
      setEta(duration); // Update duration with new duration
      // console.log(polyline);
      const decodedPath = google.maps.geometry.encoding.decodePath(polyline);

      setPolyline(decodedPath);
      setDistance(distance); // Set distance
    });

    return () => {
      // Clean up socket listeners on unmount
      socket.off('location:update');
    };
  }, [orderId]);

  useEffect(() => {
    const smoothMove = () => {
      const { lat: startLat, lng: startLng } = markerPosition;
      const { lat: endLat, lng: endLng } = targetPosition;

      const nextLat = lerp(startLat, endLat, 0.05);
      const nextLng = lerp(startLng, endLng, 0.05);

      setMarkerPosition({ lat: nextLat, lng: nextLng });

      const distanceLat = Math.abs(nextLat - endLat);
      const distanceLng = Math.abs(nextLng - endLng);

      if (distanceLat > 0.00001 || distanceLng > 0.00001) {
        animationRef.current = requestAnimationFrame(smoothMove);
      } else {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }
    };

    animationRef.current = requestAnimationFrame(smoothMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [targetPosition, markerPosition]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Title level={4}>Order #{orderId}</Title>
            <Text>Your order is on the way!</Text>
            <br />
            <Text strong>Distance: </Text>
            <Text>{distance}</Text>
            <br />
            <Text strong>ETA: </Text>
            <Text>{eta}</Text>
            <Progress percent={100 - eta} status="active" />
          </Card>
        </Col>
        <Col span={16}>
          <GoogleMap
            zoom={16}
            center={markerPosition}
            mapContainerStyle={{ height: '500px', width: '100%' }}
          >
            <Polyline path={polyline} />
            <Marker
              position={markerPosition}
              icon={{
                url: '/delivery/car.png',
                scaledSize: new google.maps.Size(50, 50),
                anchor: new google.maps.Point(25, 25),
              }}
            />
            {/* {directions && <DirectionsRenderer directions={directions} />} */}
          </GoogleMap>
        </Col>
      </Row>
    </div>
  );
};

export default TrackPage;
