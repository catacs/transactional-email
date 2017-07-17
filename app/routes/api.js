'use strict';

const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email');

// Email api
router.get('/emails', emailController.findAll);
router.get('/emails/:id', emailController.find);
router.post('/emails', emailController.create);
router.put('/emails/:id', emailController.update);
router.delete('/emails/:id', emailController.remove);

module.exports = router;
