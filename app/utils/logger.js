'use strict';

const morgan = require('morgan');
const winston = require('winston');

winston.emitErrs = true;

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

// Add morgan id parameter
morgan.token('id', function getId (req) {
  return req.id;
});

morgan.token('pid', function getPid() {
  return process.pid;
});

 // I override logger function
logger.log = function(){
  const args = arguments;
  args[1] = `${process.pid} ${args[1]}`;
  winston.Logger.prototype.log.apply(this, args);
};

module.exports = logger;
module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message.slice(0, -1));
  },
};

