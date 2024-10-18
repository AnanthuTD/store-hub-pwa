export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private iceServers: RTCConfiguration = {
    iceServers: [{ urls: 'stun:stun1.l.google.com:19302' }],
  };

  createPeerConnection(
    onTrack: (stream: MediaStream) => void,
    onIceCandidate: (candidate: RTCIceCandidate) => void,
  ): RTCPeerConnection | null {
    this.peerConnection = new RTCPeerConnection(this.iceServers);

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        onIceCandidate(event.candidate);
      }
    };

    this.peerConnection.ontrack = (event) => {
      onTrack(event.streams[0]);
    };

    return this.peerConnection;
  }

  addStream(stream: MediaStream): void {
    if (!this.peerConnection) throw new Error('PeerConnection is not initialized');

    console.log('stream: ', stream);

    stream.getTracks().forEach((track) => {
      this.peerConnection?.addTrack(track, stream);
    });
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    if (!this.peerConnection) throw new Error('PeerConnection is not initialized');

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(): Promise<RTCSessionDescriptionInit> {
    if (!this.peerConnection) throw new Error('PeerConnection is not initialized');

    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(signal: RTCSessionDescriptionInit): Promise<void> {
    if (!this.peerConnection) throw new Error('PeerConnection is not initialized');

    const remoteDesc = new RTCSessionDescription(signal);
    await this.peerConnection.setRemoteDescription(remoteDesc);
  }

  addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    if (!this.peerConnection) throw new Error('PeerConnection is not initialized');

    return this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }

  close() {
    if (this.peerConnection) this.peerConnection.close();
    this.peerConnection = null;
  }
}
