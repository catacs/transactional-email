'use strict';

const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const requestId = require('../app/routes/middlewares').requestId();
const Celebrate = require('celebrate');
const config = require('./config');

const logger = require('../app/utils/logger');

module.exports =  function(app, config) {
  logger.debug(`Overriding 'Express' logger`);
  app.use(requestId);
  app.use(morgan(config.logger.format, { stream: logger.stream }));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(methodOverride());

  // app.use(Celebrate.errors());
  
  app.disable('x-powered-by');
};
