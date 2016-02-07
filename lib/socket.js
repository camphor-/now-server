'use strict';

import debug from 'debug';
import io from 'socket.io';

const debugLog = debug('now-server:socket');

class Socket {
  constructor() {
    this.socket = null;
  }

  connect(server) {
    debugLog('starting Socket.IO');
    this.socket = io(server);
    this.socket.on('connection', this.onConnection);
  }

  onConnection() {
    debugLog('connected');
  }
}

export default new Socket();
