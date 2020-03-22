import express from'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { getSocketRouter } from './routes/sockets';
import { gamesRouter} from './routes/games';

const app = express();

import expressWs from 'express-ws';
expressWs(app);

function registerMiddleware() {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
}

function registerStatic() {
  // Only when using SSL
  app.get('*', function(req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
      res.redirect(301, `https://${req.hostname}${req.url}`);
    } else {
      /* Continue to other routes if we're not redirecting */
      next();
    }
  });

  app.use('/', express.static(path.join(__dirname, '..', 'build')));
  app.use('/static', express.static(path.join(__dirname, '..', 'build')));
  app.use('/static/*', express.static(path.join(__dirname, '..', 'build')));
}

function registerRouters() {
  app.use('/api/', gamesRouter);
  app.use('/socket/', getSocketRouter());
}

registerMiddleware();
// registerStatic();
registerRouters();

module.exports = app;
