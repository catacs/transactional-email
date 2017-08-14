const express = require('express');
const config = require('./config/config.js');
const logger = require('./app/utils/logger.js');

const app =  express();

// Configurations
require('./config/express.js')(app, config);

// Application routes
require('./app/routes')(app, config);

// Start the server
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
  logger.info('App server listening on port %s', server.address().port);
});

module.exports = app;
