import log from '../../common/log';

import mime from 'mime-types';
import crypto from 'crypto';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/assets/uploads/');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

const upload = multer({ storage: storage });

export default (req, res) => {
  log.debug('Received POST request at /api/upload');
  upload.array('files', 12)(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      log.warn(req.path + ' (multer): ' + err.message +
               ', error code: ' + err.code);
      res.sendStatus(400);
      return;
    }

    let fileReferences = [];
    for (var i = 0; i < req.files.length; i++) {
      fileReferences.push({
        originalFilename: req.files[i].originalname,
        fsFilename: req.files[i].filename
      });
    }
    res.json({
      message: 'Upload sucessful!',
      fileReferences
    });
    log.info(req.path + ' (multer): ', JSON.stringify({
      message: 'Upload sucessful!',
      fileReferences
    }));
  });
};
