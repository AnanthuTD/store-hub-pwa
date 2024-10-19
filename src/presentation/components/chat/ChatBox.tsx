'use client';
import React, { useEffect, useRef, useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Input, List, message as antdMessage } from 'antd';
import { io, Socket } from 'socket.io-client';
import Message from './message';
// import { Chat } from "@/utils/Interfaces";
import { TextAreaRef } from 'antd/es/input/TextArea';
import axiosInstance from '@/config/axios';

// Socket.IO types for better typing (optional)
interface ServerToClientEvents {
  message: (data: Chat) => void;
}

interface ClientToServerEvents {
  sendMessage: (data: { message: string }) => void;
}

interface ChatBoxProps {
  recipient: string; // username
}

const socketConnection = io('http://localhost:4000');

const ChatBox: React.FC<ChatBoxProps> = ({ recipient }) => {
  const chatLogRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<TextAreaRef>(null);
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(
    null,
  );
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState('');

  // Initialize Socket.IO
  useEffect(() => {
    setSocket(socketConnection);

    socketConnection.on('message', (newMessage: Chat) => {
      setChats((prevChats) => [...prevChats, newMessage]);

      if (chatLogRef.current) {
        chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
      }
    });

    socketConnection.on('disconnect', () => {
      antdMessage.error('Chat disconnected unexpectedly.');
    });

    return () => {
      // socketConnection.disconnect();
    };
  }, [recipient]);

  // Load previous messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!recipient) return;

        const { data }: { data: { message_list: Chat[] } } = await axiosInstance.get(
          `/user/chat/${recipient}/load_messages/`,
        );
        setChats(data.message_list);
      } catch (error) {
        console.error('Error during Axios request:', error);
        antdMessage.warning('Unable to load messages!');
      }
    };

    fetchMessages();
  }, [recipient]);

  // Send message
  const handleSendMessage = () => {
    if (socket && message) {
      socket.emit('sendMessage', { message });
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
                chat={chat}
                position={chat.sender_username === recipient ? 'left' : 'right'}
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
