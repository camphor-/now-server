'use strict';

import debug from 'debug';
import io from 'socket.io';

const debugLog = debug('now-server:lib:socket');

class Socket {
  constructor() {
    this.socket = null;
  }

  connect(server) {
    debugLog('starting socket');
    this.socket = io(server);
    this.socket.on('connect', this.onConnection);
    return this.socket;
  }

  onConnection(socket) {
    debug(`connected: ${socket.id}`);
    socket.on('disconnect', () => debug(`disconnected: ${socket.id}`));
  }
}

export default new Socket();
