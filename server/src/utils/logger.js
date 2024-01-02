const winston = require('winston');

// Create a Winston logger with transports
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Write all logs with level `error` and below to `error.log`
    new winston.transports.File({ filename: 'src/utils/error.log', level: 'error' }),
    // Write all logs to `combined.log`
    new winston.transports.File({ filename: 'src/utils/combined.log' })
  ]
});

// If we're not in production then log to the `console`
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
