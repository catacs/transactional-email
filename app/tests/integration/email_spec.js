'use strict';

//Assertion tool
const chai = require('chai');
const expect = chai.expect;
const co = require('co');

//Application
const app = require('../../../app');
const request = require('supertest')(app);

// Email Model
const mongoose = require('mongoose');
const Email = mongoose.model('Email');
const apiUrl = '/api/emails';

const fakeEmail = {
  "from": "test@test.com",
  "subject": "Test",
  "body": "It's a test",
  "bcc": [],
  "cc": [],
  "to": [
      "catacddev.@gmail.com"
  ],
};


describe('Email', function () {
  afterEach(function(done) {
    co(function* () {
      yield Email.remove({});
    }).then(done)
    .catch(done);
  });
  describe('POST /api/emails', function () {
    it('Should create new email', function (done) {
      request.post(apiUrl).send(fakeEmail).end(function (err, res) {
        if (err) {
          done(err);
        }

        expect(res.statusCode).to.equal(200);
        const email = res.body;
        expect(email).to.be.a('object');
        expect(email).to.have.property('from');
        expect(email).to.have.property('to');
        expect(email).to.have.property('subject');
        expect(email).to.have.property('body');
        expect(email).to.have.property('updatedAt');
        expect(email.from).to.equal(fakeEmail.from);
        done();
      });
    });

    it('TODO: Should return invalid email', function (done) {
      done();
    });
  });

  describe('PUT /api/emails/:id', function () {
    it('Should update email', function (done) {
      co(function* () {
        const createdEmail = yield Email.create(fakeEmail);
        return createdEmail;
      }).then(function (email) {
        const update = { subject: 'ModifiedSubject' };
        request.put(`${apiUrl}/${email.id}`).send(update).end(function (err, res) {
          if (err) {
            done(err);
          }

          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });
  });

  describe('GET /api/emails', function () {
    it('Should get email', function (done) {
      co(function* () {
        const createdEmail = yield Email.create(fakeEmail);
        return createdEmail;
      }).then(function (email) {
        request.get(`${apiUrl}/${email.id}`).end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(200);
          expect(res.body.subject).to.equal(email.subject);
          expect(res.body.body).to.equal(email.body);
          expect(res.body.from).to.equal(email.from);
          done();
        });
      });
    });
  });

  describe('DELETE /api/emails', function () {
    it('Should delete email', function (done) {
      co(function* () {
        const createdEmail = yield Email.create(fakeEmail);
        return createdEmail;
      }).then(function (email) {
        request.delete(`${apiUrl}/${email.id}`).end(function (err, res) {
          if (err) {
            done(err);
          }

          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });
  });
});
