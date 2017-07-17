'use strict';

const emailRepository = require('../repositories/factories/email');

const create = function* (userData) {
  validate(userData);
  const email = yield emailRepository.create(userData);
  if (!email) {
    throw new Error('EmailNotCreated');
  }

  return sanitize(email);
};

const find = function* (id) {
  return yield emailRepository.find(id);
};

const findAll = function* () {
  return yield emailRepository.findAll();
};

const update = function* (id, email) {
  return yield emailRepository.update(id, email);
};

const remove = function* (id) {
  return yield emailRepository.remove(id);
};

function validate(email) {
  if (!email) {
    throw new Error('EmailNotValid');
  }
}

function sanitize(email) {
  return email;
}

const EmailService = function () {
  return {
    create: create,
    find: find,
    findAll: findAll,
    update: update,
    remove: remove,
  };
};

module.exports = EmailService();
