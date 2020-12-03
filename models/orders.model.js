'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: Number,
  userId: Number,
  subTotal: Number,
  date: { type: Date, default: Date.now() },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const OrderSchema = mongoose.model('order_', orderSchema);

module.exports = { OrderSchema };
