'use strict';

import crypto from 'crypto';
import debugLogger from 'debug';

const debug = debugLogger('now-server:lib:camera');

const TAKE_PICTURE_TIMEOUT = 30 * 1000; // unit: ms

class CameraSocket {
  constructor() {
    this.socket = null;
  }

  connect(socket) {
    debug('starting socket');
    this.socket = socket.of('/camera');
    this.socket.on('connection', this.onConnection);
    return this.socket;
  }

  onConnection(socket) {
    debug(`connected: ${socket.id}`);
  }

  _createUniqueEvent(base) {
    const random = crypto.randomBytes(256).toString('hex');
    const sha1 = crypto.createHash('sha1');
    sha1.update(random);
    const hash = sha1.digest('base64');
    return `${base} ${hash}`;
  }

  takePicture() {
    debug('take picture');
    return Promise.all(
      Object.keys(this.socket.connected).map((key) => {
        return new Promise((resolve, reject) => {
          const event = this._createUniqueEvent('took picture');
          const client = this.socket.connected[key];
          // Timeout
          const timeoutId = setTimeout(() => {
            debug(`timeout: ${event}`);
            reject();
          }, TAKE_PICTURE_TIMEOUT);
          // Event for receiving a picture
          client.once(event, (data) => {
            clearTimeout(timeoutId);
            if (data.success) {
              debug(event);
              resolve(data.data);
            } else {
              reject();
            }
          });
          // Request to take a picture
          client.emit('take picture', {
            responseEvent: event
          });
        });
      })
    );
  }
}

export default new CameraSocket();
