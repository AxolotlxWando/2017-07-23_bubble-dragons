import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import { invert, isArray } from 'lodash';
import url from 'url';
import mime from 'mime-types';
import crypto from 'crypto';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies, import/extensions
import queryMap from 'persisted_queries.json';

import websiteMiddleware from './middleware/website';
import graphiqlMiddleware from './middleware/graphiql';
import graphqlMiddleware from './middleware/graphql';
import addGraphQLSubscriptions from './api/subscriptions';
import multer from 'multer';

import settings from '../../settings';
import log from '../common/log';

// eslint-disable-next-line import/no-mutable-exports
let server;

const app = express();

const { port, pathname } = url.parse(__BACKEND_URL__);
const serverPort = process.env.PORT || port;

// Don't rate limit heroku
app.enable('trust proxy');

if (__DEV__) {
  app.use(cors());
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
})
var upload = multer({ storage: storage });
// app.post('/upload', upload.array('files', 12), function (req, res, next) {})

app.post('/upload', function (req, res) {
  upload.array('files', 12)(req, res, function (err) {
    console.log(JSON.stringify(req.files));
    if (err) {
      // An error occurred when uploading
      console.log('multer error: ' + err)
      res.sendStatus(400);
      return
    }

    let fileReferences = []
    console.log('Logging uploaded files: ');
    console.log('req.files: ' + req.files);
    console.log('req.files.length: ' + req.files.length);
    for (var i = 0; i < req.files.length; i++) {
      console.log('  ' + req.files[i].size);
      console.log('  ' + req.files[i].originalname.name);
      console.log('  ' + Object.keys(req.files[i]));
      console.log('  ' + req.files[i].originalname.constructor.name);
      console.log('  ' + JSON.stringify(req.files[i].originalname));
      console.log('  ' + req.files[i].originalname == '[object File]')
      fileReferences.push({
        originalFilename: req.files[i].originalname,
        fsFilename: req.files[i].filename
      })
      console.log(fileReferences[i])
      console.log(fileReferences[i].originalFilename);
      console.log(fileReferences[i].fsFilename);
    }
    console.log('Additional info attached: ');
    for (var i = 0; i < req.body.length; i++) {
      console.log('  ' + req.body[i]);
    }
    res.json({
      message: 'Files uploaded',
      fileReferences
    })
    console.log('Response: ', JSON.stringify({
      message: 'Files uploaded',
      fileReferences
    }));
  })
})

app.use('/uploads', express.static('assets/uploads'));

app.use('/', express.static(path.join(settings.frontendBuildDir, 'web'), { maxAge: '180 days' }));

if (__DEV__ && settings.webpackDll) {
  app.use('/', express.static(settings.dllBuildDir, { maxAge: '180 days' }));
}

if (__PERSIST_GQL__) {
  const invertedMap = invert(queryMap);

  app.use(
    '/graphql',
    (req, resp, next) => {
      if (isArray(req.body)) {
        req.body = req.body.map(body => {
          return {
            query: invertedMap[body.id],
            ...body
          };
        });
        next();
      } else {
        if (!__DEV__ || (req.get('Referer') || '').indexOf('/graphiql') < 0) {
          resp.status(500).send("Unknown GraphQL query has been received, rejecting...");
        } else {
          next();
        }
      }
    },
  );
}

app.use(pathname, (...args) => graphqlMiddleware(...args));
app.use('/graphiql', (...args) => graphiqlMiddleware(...args));
app.use((...args) => websiteMiddleware(queryMap)(...args));

server = http.createServer(app);

addGraphQLSubscriptions(server);

server.listen(serverPort, () => {
  log.info(`API is now running on port ${serverPort}`);
});

server.on('close', () => {
  server = undefined;
});

if (module.hot) {
  module.hot.dispose(() => {
    try {
      if (server) {
        server.close();
      }
    } catch (error) {
      log(error.stack);
    }
  });
  module.hot.accept(['./middleware/website', './middleware/graphql']);
  module.hot.accept(['./api/subscriptions'], () => {
    try {
      addGraphQLSubscriptions(server);
    } catch (error) {
      log(error.stack);
    }
  });

  module.hot.accept();
}

export default server;
