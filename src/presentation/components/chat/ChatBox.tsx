'use client';
import React, { useEffect, useRef, useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Input, List, message as antdMessage } from 'antd';
import { io } from 'socket.io-client';
import Message from './Message';
// import { Chat } from "@/utils/Interfaces";
import { TextAreaRef } from 'antd/es/input/TextArea';

interface ChatBoxProps {
  recipient: string;
  pastChats?: Chat[];
}

const socketConnection = io(`${import.meta.env.VITE_API_BASE_URL}/adminChat`);

const ChatBox: React.FC<ChatBoxProps> = ({ recipient, pastChats = [], senderId }) => {
  const chatLogRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<TextAreaRef>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState('');

  // Initialize Socket.IO
  useEffect(() => {
    socketConnection.on('message', (newMessage: Chat) => {
      const array = [...chats, newMessage];

      console.log(array);

      setChats((prevChats) => [...prevChats, newMessage]);

      if (chatLogRef.current) {
        chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
      }
    });

    socketConnection.emit('initiate', senderId, recipient);

    socketConnection.on('disconnect', () => {
      antdMessage.error('Chat disconnected unexpectedly.');
    });

    return () => {
      console.log('unmounting chat');
      socketConnection.off('message');
      socketConnection.off('me');
    };
  }, [recipient]);

  // Send message
  const handleSendMessage = () => {
    if (socketConnection && message) {
      socketConnection.emit('sendMessage', { message });
      setMessage('');
    }
  };

  // Handle Enter key for sending messages
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent newline on Enter
      handleSendMessage();
    }
  };

  // Auto scroll to bottom when new chats arrive
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chats]);

  const formatTimestamp = (timestamp: Date | string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(timestamp).toLocaleString('en-IN', options);
  };

  useEffect(() => {
    setChats(pastChats);
  }, [pastChats]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <div
        ref={chatLogRef}
        style={{
          height: '100%',
          overflowY: 'auto',
          padding: '16px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <List
          dataSource={chats}
          renderItem={(chat, index) => (
            <List.Item key={chat.id} style={{ padding: '10px 0' }}>
              <Message
                endNoneRounded={[true]}
                chat={chat}
                position={chat.senderId === recipient ? 'left' : 'right'}
                displayTime={index === chats.length - 1}
              />
              {index === chats.length - 1 && (
                <div style={{ textAlign: 'right', color: '#999', fontSize: '12px' }}>
                  {formatTimestamp(chat.timestamp)}
                </div>
              )}
            </List.Item>
          )}
        />
      </div>

      <div
        style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <SmileOutlined style={{ fontSize: '24px', marginRight: '8px', color: '#1890ff' }} />
        <Input.TextArea
          ref={textAreaRef}
          autoSize={{ maxRows: 4 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message"
          style={{ resize: 'none', width: '100%', marginRight: '8px' }}
        />
        <Button type="primary" onClick={handleSendMessage} disabled={!message}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
