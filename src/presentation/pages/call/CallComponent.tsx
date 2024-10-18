import React, { useEffect, useState, useRef } from 'react';
import { Button, Row, Col, Select, Drawer, Divider } from 'antd';
import { SocketService } from '@/infrastructure/services/SocketService';
import { WebRTCService } from '@/infrastructure/services/WebRTCService';
import { CallManager } from '@/application/CallManager';
import Cookies from 'js-cookie';
import { EventNames } from './eventNames';

export function getCookies() {
  return Cookies.get('userId');
}

const Iam = getCookies();

const socketService = new SocketService(Iam);
const webRTCService = new WebRTCService();

const CallComponent: React.FC = () => {
  const [me, setMe] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [incomingCall, setIncomingCall] = useState<boolean>(false);
  const [caller, setCaller] = useState<string>('');
  const [peersOnline, setPeersOnline] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [callerSignal, setCallerSignal] = useState<RTCSessionDescriptionInit | null>(null);
  const [iceCandidates, setIceCandidates] = useState<RTCIceCandidateInit[]>([]);

  const callManager = new CallManager(webRTCService, socketService, setRemoteStream);

  // Refs for local and remote audio
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((userStream) => {
      setStream(userStream);
    });

    socketService.on(EventNames.GET_ME, (id: string) => setMe(id));
    socketService.on(
      EventNames.CALL_INCOMING,
      ({ from, signal }: { from: string; signal: RTCSessionDescriptionInit }) => {
        setCaller(from);
        setIncomingCall(true);
        setCallerSignal(signal);
      },
    );
    socketService.on(EventNames.PEERS_ONLINE, ({ ids }) => {
      setPeersOnline(ids);
    });

    socketService.on(EventNames.CALL_ACCEPTED, async (signal) => {
      setCallAccepted(true);
      callManager.acceptedCall(signal);
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

  const initiateCall = (peerId: string) => {
    if (stream) {
      callManager.initiateCall(peerId, stream);
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
    socketService.emit('call:endCall', null);
    if (stream) stream.getTracks().forEach((track) => track.stop());
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      {/* Centering the row */}
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Select
          options={peersOnline
            .map((peerId) => (me !== peerId ? { label: peerId, value: peerId } : null))
            .filter((peer) => !!peer)}
          onSelect={(value) => setSelectedUser(value)}
          defaultValue={'Select user to call'}
          style={{
            width: '250px',
            marginRight: '10px',
            borderRadius: '8px',
            padding: '8px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Button
          type="primary"
          onClick={() => initiateCall(selectedUser)}
          style={{
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
            borderRadius: '8px',
            padding: '0 20px',
          }}
        >
          Initiate Call
        </Button>
      </Row>

      <Drawer
        closable={false}
        destroyOnClose
        placement="top"
        open
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
          style={{ fontSize: '16px', fontWeight: '500', textAlign: 'center', marginBottom: '10px' }}
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
    </div>
  );
};

export default CallComponent;
