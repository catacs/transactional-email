'use strict';

const mongoose = require('mongoose');
const uuid = require('node-uuid');

module.exports.validateRequest = function (req, res, next) {
	next();
};

module.exports.ensureDatabaseConnection = function (req, res, next) {
	if (!dbIsConnected()) {
		return res.status(503).end();
	}
	next();
};

function dbIsConnected() {
	const connection = mongoose.connection;
	const STATES = mongoose.STATES;
	return connection.readyState === STATES.connected;
}

module.exports.requestId = function (options) {
  options = options || {};
  const headerName = options.headerName || 'X-Request-ID';

  return function requestid(req, res, next) {
		const id = uuid.v4();
		req.id = id;
    res.on('header', function () {
      res.setHeader(headerName, id);
    });

    next();
  };
};
