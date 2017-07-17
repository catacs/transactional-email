'use strict';

const logger = require('../utils/logger');
const error = require('../helpers/error');

module.exports.notFound = function () {
  return function notFound(req, res, next) {
    res.status(404).send({message: 'not found'});
  };
};

module.exports.serverError = function () {
  return function serverError(err, req, res, next) {
    return error(err, req, res);
  };
};

module.exports.logErrors = function () {
  return function logErrors(err, req, res, next) {
    err.requestId = req.id;
    logger.error(err);
    next(err);
  };
};
