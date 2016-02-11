'use strict';

import crypto from 'crypto';
import {Router} from 'express';
import {writeFile} from 'fs';
import moment from 'moment';
import camera from '../lib/camera';

const router = Router();

const UPLOAD_DIR = 'uploads/camera/';

router.get('/', (req, res, next) => {
  res.json({});
});

const generateFileName = () => {
  const random = crypto.randomBytes(256).toString('hex');
  const md5 = crypto.createHash('md5');
  md5.update(random);
  const hash = md5.digest('hex');
  const time = moment().format('YYYYMMDD-HHmmss-SSS');
  return `${UPLOAD_DIR}${time}-${hash}.jpg`;
};

const savePicture = (buf) => new Promise((resolve, reject) => {
  const fileName = generateFileName();
  writeFile(fileName, buf, (err) => {
    if (err) {
      reject(err.toString());
    } else {
      resolve(fileName);
    }
  });
});

const savePictures = (data) => Promise.all(data.map(savePicture));

router.get('/take', (req, res, next) => {
  camera.takePicture().then(savePictures).then(
    (data) => {
      console.log(data);
      res.json({
        success: true,
        files: data
      });
    },
    (error) => {
      res.status(500).json({
        success: false,
        message: error
      });
    }
  );
});

export default router;
