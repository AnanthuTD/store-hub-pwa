import { Modal, Button, Progress } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const OrderAlertModal = ({ newOrder, progress, handleOrderAcceptance }) => {
  if (!newOrder) return null;

  return (
    <Modal
      key={newOrder.orderId}
      open={!!newOrder}
      closable={false}
      footer={[
        <>
          <div
            key="accept"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={handleOrderAcceptance}
              type="primary"
              style={{
                backgroundColor: '#4CAF50',
                borderColor: '#4CAF50',
                color: '#FFFFFF',
                width: '75%',
                fontWeight: 'bold',
                transition: 'background-color 0.3s, transform 0.3s',
              }}
              icon={<CheckCircleOutlined />}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'FF5963';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'FF5963';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Accept
            </Button>
          </div>
          <Progress percent={progress} showInfo={false} strokeColor="#4CAF50" size="small" />
        </>,
      ]}
      style={{
        backgroundColor: '#FF5963', // Change to your desired color
        borderRadius: '8px', // Optional: rounded corners for the modal
      }}
      title={<div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>New Order</div>}
    >
      <div style={{ fontSize: '1rem', color: '#555' }}>
        <div style={{ marginBottom: '10px' }}>
          Order ID: <strong>{newOrder?.orderId}</strong>
        </div>
        <div style={{ marginBottom: '10px' }}>
          Earnings: <strong>{newOrder?.earnings}</strong>
        </div>
        <div>
          Distance: <strong>{newOrder?.distance}</strong>
        </div>
      </div>
    </Modal>
  );
};

export default OrderAlertModal;
