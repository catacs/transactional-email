'use strict';

const create = function (statusCode, error, message) {
  return {
    statusCode: statusCode,
    error: error,
    message: message,
  };
};

const error = function onerror(error, req, res) {
  let statusCode = 500;
  let message = 'internal server error';

  if (error.statusCode) {
    statusCode = error.statusCode;
  }

  if (error.statusCode) {
    message = error.message;
  }

  const handledError = {
    message: message,
  };

  res.status(statusCode).send(handledError);
};

module.exports = error;
