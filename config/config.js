'use strict';

const env = process.env.NODE_ENV || 'development';
const defaults = require('./defaults.json');
const envConf = require('./' + env + '.json');

const configuration = Object.assign({}, defaults, envConf);

module.exports = configuration;