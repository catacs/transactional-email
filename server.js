var express = require('express');
var config = require('./config/config.js');
var logger = require('./app/utils/logger.js');

var app =  express();

// Configurations
require('./config/express.js')(app, config);

// Application routes
require('./app/routes')(app, config);

// Start the server
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  logger.info('App server listening on port %s', server.address().port);
});

module.exports = app;
