'use strict';

const express = require('express');
const router = express.Router();

// const data = require('../modules/data');
const user = require('../routes/user.routes');

router.use('/user', user);

module.exports = router;
