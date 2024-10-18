export enum EventNames {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  GET_ME = 'call:getMe',
  PEERS_ONLINE = 'call:peersOnline',
  CALL_USER = 'call:initiate',
  ANSWER_CALL = 'call:answer',
  CANDIDATE = 'call:candidate',
  END_CALL = 'call:end',
  CALL_ACCEPTED = 'call:accepted',
  CALL_INCOMING = 'call:incoming',
  CALLER_SIGNAL = 'call:callerSignal',
}
