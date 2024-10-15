'use client';
import { useEffect, useState, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  // DirectionsRenderer,
  useLoadScript,
  Polyline,
  MarkerF,
} from '@react-google-maps/api';
import io from 'socket.io-client';
import { Card, Typography, Row, Col, message, notification } from 'antd';
import axiosInstance from '@/config/axios';

const { Title, Text } = Typography;

// Socket connection to the /track namespace
const socket = io('http://localhost:4000/track');

const lerp = (start: number, end: number, t: number) => start + (end - start) * t; // Linear interpolation function

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_MAP_API_KEY;

function statusMessage(status: string): string {
  switch (status) {
    case 'Pending':
      return 'Your order is being processed.';
    case 'Assigned':
      return 'A delivery partner has been assigned to your order.';
    case 'Collecting':
      return 'Your delivery partner is collecting your order from the store.';
    case 'In Transit':
      return 'Your order is on the way!';
    case 'Delivered':
      return 'Your order has been delivered!';
    case 'Completed':
      return 'Your order is completed successfully!';
    default:
      return 'Unknown order status.';
  }
}

const TrackPage = ({
  orderId,
  initialLocation,
  deliveryOtp,
}: {
  orderId: string;
  initialLocation: {
    lat: number;
    lng: number;
  };
  deliveryOtp: number;
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [markerPosition, setMarkerPosition] = useState(
    initialLocation || {
      lat: 37.7749,
      lng: -122.4194,
    },
  );
  const [nextMarkerPosition, setNextMarkerPosition] = useState(
    initialLocation || {
      lat: 37.7749,
      lng: -122.4194,
    },
  );
  const [targetPosition, setTargetPosition] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [eta, setEta] = useState<number>(0);
  const [distance, setDistance] = useState(0);
  const [polyline, setPolyline] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState(statusMessage('Assigned'));
  const [order, setOrder] = useState(null);
  const [desitnationLocation, setDestinationLocation] = useState({});

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (initialLocation) {
      setMarkerPosition(initialLocation);
      setNextMarkerPosition(initialLocation);
    }
  }, [initialLocation]);

  useEffect(() => {
    async function fetchOrder(orderId: string) {
      const { data } = await axiosInstance.get(`/user/order/${orderId}`);
      setOrder(data.order);
      setDeliveryStatus(statusMessage(data.order.deliveryStatus));
    }
    fetchOrder(orderId);

    // Listen for real-time location updates from the server
    socket.on('location:update', (data) => {
      console.log(data);
      const { location, destinationLocation, duration, polyline, distance } = data;
      message.success('Location update received');
      setDestinationLocation(destinationLocation);
      setTargetPosition(location);
      setNextMarkerPosition(location);
      setEta(duration);
      const decodedPath = google.maps.geometry.encoding.decodePath(polyline);
      setPolyline(decodedPath);
      setDistance(distance);
    });

    // Join the specific order room for tracking
    socket.emit('track:order', orderId);

    socket.on('order:status:update', ({ deliveryStatus }) => {
      const msg = statusMessage(deliveryStatus);
      notification.success({ message: msg });
      setDeliveryStatus(msg);
    });

    return () => {
      // Clean up socket listeners on unmount
      socket.off('location:update');
      socket.off('order:status:update');
      socket.off('track:order');
    };
  }, [orderId]);

  useEffect(() => {
    const smoothMove = () => {
      const { lat: startLat, lng: startLng } = markerPosition;
      const { lat: endLat, lng: endLng } = targetPosition;

      const nextLat = lerp(startLat, endLat, 0.05);
      const nextLng = lerp(startLng, endLng, 0.05);

      setMarkerPosition({ lat: nextLat, lng: nextLng });
      setNextMarkerPosition({ lat: nextLat, lng: nextLng });

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
  }, [targetPosition, nextMarkerPosition]);

  if (!isLoaded) return <div>Loading...</div>;

  if (!order) return <div>No Order Found</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Title level={4}>Order #{order._id}</Title>

            {/* deliveryStatus */}
            {deliveryStatus && <Text>{deliveryStatus}</Text>}

            <br />
            <Text strong>Delivery OTP: </Text>
            <Text>{deliveryOtp}</Text>
            <br />
            <br />
            <Text strong>Distance: </Text>
            <Text>{distance}</Text>
            <br />
            <Text strong>ETA: </Text>
            <Text>{eta}</Text>
            {/* <Progress percent={100 - eta} status="active" /> */}
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
            <MarkerF position={desitnationLocation} label={`Desitnation`} />
            {/* {directions && <DirectionsRenderer directions={directions} />} */}
          </GoogleMap>
        </Col>
      </Row>
    </div>
  );
};

export default TrackPage;
