'use strict';

const emailService = require('../services/email');
const error = require('../helpers/error');
const co = require('co');

/**
 * @api {post} /api/emails Create email
 * @apiName create
 * @apiGroup email
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     }
 *
 */
const create = function (req, res, next) {
  co(function* () {
    const emailData = req.body;
    const email = yield emailService.create(emailData);
    res.send(email);
  }).catch(next);
};

/**
 * @api {get} /api/emails/:id Get email
 * @apiName find
 * @apiGroup email
 * 
 * @apiParam {ObjectId} id emails unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     }
 *
 */
const find = function (req, res, next) {
  co(function* () {
    const id = req.params.id;
    const email = yield emailService.find(id);
    res.send(email);
  }).catch(next);
};

/**
 * @api {get} /api/emails Get emails
 * @apiName findAll
 * @apiGroup email
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *     }]
 *
 */
const findAll = function (req, res, next) {
  co(function* () {
    const emails = yield emailService.findAll();
    res.send(emails);
  }).catch(next);
};

/**
 * @api {put} /api/emails/:id Update email
 * @apiName update
 * @apiGroup email
 * 
 * @apiParam {ObjectId} id emails unique ID.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     }
 *
 */
const update = function (req, res, next) {
  co(function* () {
    const id = req.params.id;
    const update = req.body;
    const emailUpdated = yield emailService.update(id, update);
    res.status(200).send(emailUpdated);
  }).catch(next);
};

/**
 * @api {delete} /api/emails/:id Delete email
 * @apiName remove
 * @apiGroup email
 * 
 * @apiParam {ObjectId} id emails unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     }
 *
 */
const remove = function (req, res, next) {
  co(function* () {
    const id = req.params.id;
    const email = yield emailService.remove(id);
    res.send(email);
  }).catch(next);
};

function emailController() {
  return {
    create: create,
    find: find,
    findAll: findAll,
    update: update,
    remove: remove,
  };
};

module.exports = emailController();
