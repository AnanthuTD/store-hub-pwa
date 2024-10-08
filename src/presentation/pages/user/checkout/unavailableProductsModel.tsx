import React from 'react';
import { Modal, List, Image } from 'antd';

const UnavailableProductsModal = ({ unavailableProducts, onClose }) => {
  return (
    <Modal
      title={'Some products are not available for delivery in your area!'}
      open={!!unavailableProducts.length}
      onCancel={onClose}
      footer={null}
    >
      <List
        dataSource={unavailableProducts}
        renderItem={(product) => (
          <List.Item key={product._id}>
            <List.Item.Meta
              avatar={<Image width={100} src={product.images[0]} alt={product.name} />}
              title={product.name}
              description={'Not available for delivery in your area!'}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default UnavailableProductsModal;
