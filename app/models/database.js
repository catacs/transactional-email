'use strict';

const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../../config/config');
const mongoURIPrefix = 'mongodb://';
const mongoURI = getMongoUri(config);

// set Promise provider to bluebird
mongoose.Promise = require('bluebird');

const connection = mongoose.connection;

connection.on('open', function (ref) {
  logger.info(`Connected to mongo server ${config.persistence.host} port ${config.persistence.port}`);
});

connection.on('error', function (err) {
  logger.warn('Could not connect to mongo server!');
  return logger.error(err);
});

connection.on('reconnected', function () {
  logger.info('MongoDB reconnected!');
});

// When the connection is disconnected
connection.on('disconnected', function () {
  logger.warn('Mongoose default connection disconnected');
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    logger.warn('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

function getMongoUri(config) {
  const host = config.persistence.host || 'localhost';
  const port =  config.persistence.port || 27017;
  const user = config.persistence.user || '';
  const password = config.persistence.password || '';
  const database = config.persistence.database || 'emails-development';

  let auth = '';
  const server = `${host}:${port}`;

  if (user && password) {
    auth = `${user}@${password}`;
  }

  const mongoUri = `${mongoURIPrefix}${auth}${server}/${database}`;
  return mongoUri;
}

function connect() {
  return mongoose.connect(mongoURI, { useMongoClient: true, reconnectTries: Number.MAX_VALUE });
}

module.exports = connect();
