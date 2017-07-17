'use strict';

const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  from: String,
  to: [String],
  cc: [String],
  bcc: [String],
  subject: String,
  body: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// on every save, add the date
EmailSchema.pre('save', function (next) {    
  // get the current date
  const currentDate = new Date();

  // change the updatedAt field to current date
  this.updatedAt = currentDate;

  // if createdAt doesn't exist, add to that field
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

// on every save, add the date
EmailSchema.pre('update', function (next) {
  // get the current date
  const currentDate = new Date();

  // change the updatedAt field to current date
  this.updatedAt = currentDate;

  next();
});

const User = mongoose.model('Email', EmailSchema);
