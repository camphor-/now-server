'use strict';

import debug from 'debug';
import io from 'socket.io';

const debugLog = debug('now-server:camera-socket');

class CameraSocket {
  constructor(socket) {
    this.socket = null;
  }

  connect(socket) {
    debugLog('starting socket');
    this.socket = socket.of('/camera');
    this.socket.on('connection', this.onConnection);
    return this.socket;
  }

  onConnection() {
    debugLog('connected');
  }

  emitTakePicture() {
    debugLog('emitTakePicture');
    this.socket.emit('takePicture');
  }
}

export default new CameraSocket();
