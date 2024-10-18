import { WebRTCService } from '../infrastructure/services/WebRTCService';
import { SocketService } from '../infrastructure/services/SocketService';

const EVENT_CALL_USER = 'call:initiate';
const EVENT_ANSWER_CALL = 'call:answer';
const EVENT_CANDIDATE = 'call:candidate';

export class CallManager {
  private webRTCService: WebRTCService;
  private socketService: SocketService;
  private setRemoteStream: (stream: MediaStream) => void;
  private callAccepted: boolean = false;

  constructor(
    webRTCService: WebRTCService,
    socketService: SocketService,
    setRemoteStream: (stream: MediaStream) => void,
  ) {
    this.webRTCService = webRTCService;
    this.socketService = socketService;
    this.setRemoteStream = setRemoteStream;
  }

  initiateCall(userId: string, stream: MediaStream): void {
    console.log('initiating call');
    this.webRTCService.createPeerConnection(
      (remoteStream) => {
        console.log('setting remote stream .....', remoteStream);

        // Set the remote stream to be used in UI
        this.setRemoteStream(remoteStream);
      },
      (iceCandidate) => {
        this.socketService.emit(EVENT_CANDIDATE, { candidate: iceCandidate, to: userId });
      },
    );

    this.webRTCService.addStream(stream);

    this.webRTCService.createOffer().then((offer) => {
      this.socketService.emit(EVENT_CALL_USER, { userToCall: userId, signalData: offer });
    });
  }

  async answerCall(
    callerSignal: RTCSessionDescriptionInit,
    stream: MediaStream,
    iceCandidates: RTCIceCandidateInit[],
    caller,
  ): Promise<void> {
    try {
      console.log('answering call');
      this.callAccepted = true;

      // Create peer connection and set remote stream
      this.webRTCService.createPeerConnection(
        (remoteStream) => {
          this.setRemoteStream(remoteStream); // Set the remote stream for UI
        },
        (iceCandidate) => {
          // Send the ICE candidate to the caller
          this.socketService.emit(EVENT_CANDIDATE, { to: caller, candidate: iceCandidate });
        },
      );

      // Add local stream to the connection
      this.webRTCService.addStream(stream);

      // Set remote description (caller SDP)
      await this.webRTCService.setRemoteDescription(callerSignal);

      // Process and add ICE candidates asynchronously
      await Promise.all(
        iceCandidates.map(async (candidate) => {
          try {
            await this.webRTCService.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (error) {
            console.error('Error adding ICE candidate:', error);
          }
        }),
      );

      // Create answer SDP and send it to the caller
      const answer = await this.webRTCService.createAnswer();
      this.socketService.emit(EVENT_ANSWER_CALL, { to: caller, signal: answer });
    } catch (error) {
      console.error('Error answering call:', error);
    }
  }

  acceptedCall(receiverSignal: RTCSessionDescriptionInit) {
    this.webRTCService.setRemoteDescription(new RTCSessionDescription(receiverSignal));
  }

  hangupCall() {
    console.log('hanging up call');
    this.webRTCService.close(); // Close the peer connection
    this.callAccepted = false;
    this.setRemoteStream(null); // Reset remote stream in UI

    // Clean up ICE candidates or any other call-related state
    this.socketService.emit('call:endCall', null); // Inform others about call hangup
    this.socketService.off(EVENT_CANDIDATE); // Remove ICE candidate listeners if needed
  }
}
