import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, Row, Col, Select } from 'antd';
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
      callManager.answerCall(callerSignal, stream, iceCandidates);
      setCallAccepted(true);
      setIncomingCall(false);
    }
  };

  // Set audio streams when the refs are ready
  useEffect(() => {
    if (localAudioRef.current && stream) {
      localAudioRef.current.srcObject = stream;
    }
    if (remoteAudioRef.current && remoteStream) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [stream, remoteStream]);

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <h3>Your Audio</h3>
          <audio ref={localAudioRef} autoPlay controls />
        </Col>
        <Col span={12}>
          <h3>Remote Audio</h3>
          <audio ref={remoteAudioRef} autoPlay controls />
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: '20px' }}>
        <Select
          options={peersOnline
            .map((peerId) => (me !== peerId ? { label: peerId, value: peerId } : null))
            .filter((peer) => !!peer)}
          onSelect={(value) => setSelectedUser(value)}
          defaultValue={'select user to call'}
        />
        <Button type="primary" onClick={() => initiateCall(selectedUser)}>
          Initiate Call
        </Button>
      </Row>

      {/* Incoming Call Modal */}
      <Modal
        title="Incoming Call"
        open={incomingCall}
        onCancel={() => setIncomingCall(false)}
        footer={[
          <Button key="reject" danger onClick={() => setIncomingCall(false)}>
            Reject
          </Button>,
          <Button key="accept" type="primary" onClick={answerCall}>
            Accept
          </Button>,
        ]}
      >
        <p>Caller: {caller}</p>
      </Modal>
    </div>
  );
};

export default CallComponent;
