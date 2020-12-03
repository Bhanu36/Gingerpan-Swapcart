'use strict';

const appRoot = require('app-root-path');
const winston = require('winston');
require('winston-daily-rotate-file');

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    handleExceptions: true,
    json: true,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message) {
    // use the 'info' log level so the output will be picked up by both transports
    logger.info(message);
  }
};

module.exports = logger;
