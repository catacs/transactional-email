'use strict';

const EmailSchema = require('../../models/email');
const db = require('../../models/database');
const Email = db.model('Email');

const create = function* (emailData) {
  //create new email model
  const email = new Email(emailData);

  const result = yield Email.create(email);
  return result;
};

const find = function* (id) {
  const result = yield Email.findById(id).exec();
  return result;
};

const findAll = function* () {
  const result = yield Email.find()
                     .sort({ updatedAt: -1 })
                     .lean()
                     .exec();
  return result;
};

const update = function* (id, email) {
  const result = yield Email.findByIdAndUpdate(id, email).exec();
  return result;
};

const remove = function * (id) {
  const email = yield Email.findByIdAndRemove(id).exec();
  return email;
};

const EmailRepository = function () {
};

EmailRepository.prototype = {
  create: create,
  find: find,
  findAll: findAll,
  update: update,
  remove: remove,
};

module.exports = EmailRepository;
