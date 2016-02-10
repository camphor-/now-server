'use strict';

import {Router} from 'express';
import socket from '../lib/socket';

const router = Router();

router.get('/', (req, res, next) => {
  res.json({});
});

router.get('/take', (req, res, next) => {
  socket.emitTakePicture();
  res.json({"take": ""});
});

export default router;
