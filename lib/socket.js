'use strict';

import debug from 'debug';
import io from 'socket.io';

const debugLog = debug('now-server:socket');

class Socket {
  constructor() {
    this.socket = null;
  }

  connect(server) {
    debugLog('starting socket');
    this.socket = io(server);
    this.socket.on('connection', this.onConnection);
    return this.socket;
  }

  onConnection() {
    debugLog('connected');
  }
}

export default new Socket();
