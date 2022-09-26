require('./env');

let logLevel = process.env.LOG_LEVEL;

if (!logLevel) {
  logLevel = 'info';
}

console.log(`Setting log level to ${logLevel}`);

const options = {
  level: logLevel
};

const logger = require('pino')(options);
const logging_middleware = require('pino-http')({
  logger
});

module.exports = { logger, logging_middleware };
