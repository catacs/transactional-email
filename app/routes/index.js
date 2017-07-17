'use strict';

const express = require('express');
const router = express.Router();
const api = require('./api.js');
const error = require('./errors.js');
const middlewares = require('./middlewares');

module.exports = function (app, config) {
  app.all('/*', function(req, res, next) {
    //CORS headers
    res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

  app.all('*', middlewares.ensureDatabaseConnection);
  // Auth Middleware - This will check if the token is valid
  // Only the requests that start with /api/v1/* will be checked for the token.
  // Any URL's that do not follow the below pattern should be avoided unless you
  // are sure that authentication is not needed
  app.all('/api/*', [middlewares.validateRequest]);

  router.use('/api/', api);
  router.use('/api/v1/', api);
  app.use(router);

  // When routes no found check send errors
  app.use(error.logErrors());
  app.use(error.notFound());
  app.use(error.serverError());
};
