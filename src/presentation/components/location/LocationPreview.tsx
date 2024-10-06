import React from 'react';
import { Card, Button, Form } from 'antd';
import { LocationData } from '../../pages/vendor/shop/register/types';

interface LocationPreviewProps {
  selectedLocation: LocationData | null;
  onOpenModal: () => void;
}

const LocationPreview: React.FC<LocationPreviewProps> = ({ selectedLocation, onOpenModal }) => {
  return (
    <Form.Item label="Location">
      {selectedLocation ? (
        <Card
          hoverable
          cover={<LocationMapEmbed location={selectedLocation} />}
          onClick={onOpenModal}
        >
          <p>
            <strong>Selected Coordinates:</strong> Latitude: {selectedLocation.lat}, Longitude:{' '}
            {selectedLocation.lng}
          </p>
        </Card>
      ) : (
        <Button onClick={onOpenModal}>Select Location</Button>
      )}
    </Form.Item>
  );
};

const LocationMapEmbed: React.FC<{ location: LocationData }> = ({ location }) => (
  <div style={{ width: '100%', height: '200px' }}>
    <iframe
      width="100%"
      height="100%"
      loading="lazy"
      allowFullScreen
      title="Selected Location Preview"
      src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_MAP_API_KEY}&q=${
        location.lat
      },${location.lng}&center=${location.lat},${location.lng}&zoom=14`}
    />
  </div>
);

export default LocationPreview;
