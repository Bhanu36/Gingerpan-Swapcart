'use strict';

const express = require('express');
const router = express.Router();

const {
  createUser, createOrder, getUserOrdersInfo, updateUserTable, getUserInfo
} = require('../modules/users/user.controllers');

router.post('', createUser);
router.post('/order', createOrder);
router.get('', getUserOrdersInfo);
router.get('/info', getUserInfo);
router.put('', updateUserTable);

module.exports = router;
