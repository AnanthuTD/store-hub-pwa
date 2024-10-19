import React, { useEffect, useRef, useState } from 'react';
import { Popover, Button, Typography } from 'antd';
import axiosInstance from '@/config/axios';

const { Text } = Typography;

function Message({
  position = 'right',
  chat,
  displayTime = true,
  endNoneRounded,
}: {
  position?: 'right' | 'left';
  chat: Chat; // Updated type name
  displayTime?: boolean;
  endNoneRounded: boolean[]; // [start-end, end-end]
}) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [unmounted, setUnmounted] = useState(false); // State to track if the component should be unmounted
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const messageChildContainerRef = useRef<HTMLDivElement>(null);
  const [rounded, setRounded] = useState('border-radius: 50%'); // Changed to inline style for rounded corners

  function getTime(timestamp: Date): React.ReactNode {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  const handleUnsend = async () => {
    try {
      const response = await axiosInstance.delete('/user/chat/unsend/', {
        data: { id: chat.id },
        withCredentials: true,
      });
      const responseData = response.data;

      if (responseData.status) {
        setOptionsVisible(false);
        setUnmounted(true); // Update the state to indicate that the component should be unmounted
      } else {
        alert('Cannot unsend');
      }
    } catch (error) {
      console.error('Failed to unsend:', error);
    }
  };

  useEffect(() => {
    if (messageContainerRef.current && messageChildContainerRef.current) {
      const maxWidth = parseFloat(getComputedStyle(messageContainerRef.current).width) / 2;
      const currentWidth = parseFloat(getComputedStyle(messageChildContainerRef.current).width);
      if (maxWidth === currentWidth) {
        setRounded('border-radius: 30px'); // Adjusted inline style for rounded corners
      }
    }
  }, []);

  if (unmounted) {
    return null; // Return null to effectively unmount the component
  }

  // Determine styles based on the position
  const isRight = position === 'right';

  // Inline styles
  const messageContainerStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    height: 'fit-content',
    // margin: "0.5rem 0",
    flexDirection: isRight ? 'row-reverse' : 'row',
  };

  const messageContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: 'fit-content',
    maxWidth: '50%',
    marginTop: 0,
  };

  const messageBubbleStyle: React.CSSProperties = {
    margin: '0 1rem',
    padding: '0.25rem 0.75rem',
    outline: '1px solid #d3d3d3', // replace with your border color
    backgroundColor: '#f7f7f7', // Add background color if needed
    ...(rounded && { borderRadius: endNoneRounded[0] ? '1rem' : '30px' }), // Apply rounded corners conditionally
  };

  const timeStyle: React.CSSProperties = {
    marginTop: '0.5rem',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '1rem',
    fontSize: '0.75rem',
    color: '#888', // Secondary color
  };

  // Popup content
  const content = (
    <div>
      <Button onClick={handleUnsend} type="text">
        Unsend
      </Button>
    </div>
  );

  return (
    <div
      style={messageContainerStyle}
      onMouseOver={() => setOptionsVisible(true)}
      onMouseOut={() => setOptionsVisible(false)}
      ref={messageContainerRef}
    >
      {/* Message Content */}
      <div style={messageContentStyle} ref={messageChildContainerRef}>
        <div style={messageBubbleStyle}>
          <Text style={{ overflowWrap: 'anywhere', fontSize: '1.25rem' }}>{chat.message}</Text>
        </div>
        {displayTime && (
          <div style={timeStyle}>
            <Text type="secondary">{getTime(chat.timestamp)}</Text>
          </div>
        )}
      </div>

      {/* Options Pop-up */}
      <Popover
        content={content}
        open={optionsVisible}
        placement="topRight"
        trigger="hover"
        onOpenChange={setOptionsVisible}
      >
        <div style={{ cursor: 'pointer' }}>
          {/* Trigger to show options, can be an icon or text */}
          <Button type="text">Options</Button>
        </div>
      </Popover>
    </div>
  );
}

export default Message;
