import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { Button, Row, Col, Drawer, Divider } from 'antd';
import { SocketService } from '@/infrastructure/services/SocketService';
import { WebRTCService } from '@/infrastructure/services/WebRTCService';
import { CallManager } from '@/application/CallManager';
import { EventNames } from './eventNames';

const socketService = new SocketService();
const webRTCService = new WebRTCService();

const CallContext = createContext(undefined);

export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};

const CallComponent: React.FC = ({ children, userId }) => {
  console.log(userId);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [incomingCall, setIncomingCall] = useState<boolean>(false);
  const [caller, setCaller] = useState<string>('');
  const [callerSignal, setCallerSignal] = useState<RTCSessionDescriptionInit | null>(null);
  const [iceCandidates, setIceCandidates] = useState<RTCIceCandidateInit[]>([]);
  const [otherPeer, setOtherPeer] = useState(null);

  const callManager = new CallManager(webRTCService, socketService, setRemoteStream);

  // Refs for local and remote audio
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((userStream) => {
      setStream(userStream);
    });

    socketService.emit('me', { userId });

    socketService.on(
      EventNames.CALL_INCOMING,
      ({ from, signal }: { from: string; signal: RTCSessionDescriptionInit }) => {
        console.log(from);
        setCaller(from);
        setIncomingCall(true);
        setCallerSignal(signal);
      },
    );

    socketService.on(EventNames.CALL_ACCEPTED, async (signal) => {
      setCallAccepted(true);
      callManager.acceptedCall(signal);
    });

    socketService.on('call:ended', () => {
      hangupCall();
    });

    socketService.emit(EventNames.GET_ME, null);
    socketService.emit(EventNames.PEERS_ONLINE, null);

    return () => {
      socketService.off(EventNames.GET_ME);
      socketService.off(EventNames.CALL_INCOMING);
      socketService.off(EventNames.PEERS_ONLINE);
      socketService.off(EventNames.CALL_ACCEPTED);
    };
  }, []);

  useEffect(() => {
    socketService.on('call:candidate', (data) => {
      if (!callAccepted) {
        setIceCandidates((prev) => [...prev, data.candidate]);
      }
    });

    return () => {
      socketService.off('call:candidate');
    };
  }, [callAccepted]);

  const initiateCall = (to) => {
    setOtherPeer(to);
    if (stream) {
      callManager.initiateCall(to, stream);
    }
  };

  const answerCall = () => {
    if (stream && callerSignal) {
      callManager.answerCall(callerSignal, stream, iceCandidates, caller);
      setCallAccepted(true);
      setIncomingCall(false);
    }
  };

  // Set audio streams when the refs are ready
  useEffect(() => {
    console.log('removeteStram from useEffect: ', remoteStream);

    if (localAudioRef.current && stream) {
      localAudioRef.current.srcObject = stream;
    }
    if (remoteAudioRef.current && remoteStream) {
      alert('remoteAudioRef.current');
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [stream, remoteStream]);

  const hangupCall = () => {
    callManager.hangupCall();
    setIncomingCall(false);
    setCallAccepted(false);
    setCaller('');
    setIceCandidates([]);
    socketService.emit(EventNames.END_CALL, { to: otherPeer });
    if (stream) stream.getTracks().forEach((track) => track.stop());
  };

  return (
    <CallContext.Provider value={{ initiateCall }}>
      <Drawer
        closable={false}
        destroyOnClose
        placement="top"
        open={incomingCall || callAccepted}
        height={'25%'}
        styles={{
          body: {
            backgroundColor: '#ffffff',
            borderRadius: '20px 20px 20px 20px',
            padding: '20px',
            boxShadow: '0px -5px 15px rgba(0, 0, 0, 0.1)',
          },
        }}
        style={{
          top: 0,
          borderRadius: '20px 20px 20px 20px',
          marginTop: '5px',
        }}
      >
        <p
          style={{
            fontSize: '16px',
            fontWeight: '500',
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          {incomingCall ? 'An incoming call is waiting...' : 'Call is in progress...'}
        </p>
        <Divider style={{ margin: '10px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            type="primary"
            style={{
              backgroundColor: '#28a745',
              borderColor: '#28a745',
              borderRadius: '8px',
              padding: '0 20px',
            }}
            onClick={answerCall}
          >
            Accept Call
          </Button>
          <Button
            onClick={hangupCall}
            style={{
              backgroundColor: '#dc3545',
              borderColor: '#dc3545',
              borderRadius: '8px',
              padding: '0 20px',
            }}
            type="primary"
          >
            Hang Up
          </Button>
        </div>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <audio ref={remoteAudioRef} autoPlay controls={false} />
          </Col>
        </Row>
      </Drawer>
      {children}
    </CallContext.Provider>
  );
};

export default CallComponent;
