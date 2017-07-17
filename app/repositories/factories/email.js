'use strict';

const EmailMongoRepository = require('../mongo/email');

const EmailRespositoryFactory = function (config) {
  return new EmailMongoRepository();
};

module.exports = EmailRespositoryFactory();
