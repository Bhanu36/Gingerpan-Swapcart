'use strict';

const config = require('../config');
const loggerUtil = require('./logger');
const messageUtil = require('./message');

exports.successResponse = (res, message, result) => {
  const response = {
    success: true,
    message: message
  };

  if (result) {
    response.result = result;
  }

  res.status(config.HTTP_STATUS_CODES.OK).send(response);
};

exports.serverErrorResponse = (res, error) => {
  loggerUtil.error({
    message: error.toString(),
    level: 'error'
  });
  res.status(config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
    success: false,
    error: error.toString(),
    message: messageUtil.serverError
  });
};

exports.validationErrorResponse = (res, errors) => {
  res.status(config.HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({
    success: false,
    errors: errors,
    message: messageUtil.validationErrors
  });
};

exports.badRequestErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.BAD_REQUEST).send({
    success: false,
    message: message
  });
};

exports.authorizationErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.UNAUTHORIZED).send({
    success: false,
    message: message
  });
};
