'use strict'
const app = require('./src/app')
const { logger } = require('./src/utils/logger')
const returnMessage = require('./src/utils/Message')
const env = require('./src/utils/EnvironmentVariables')
const dotenv = require('dotenv');
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const port = env.port()
app.listen(port, function () {
  logger.info(returnMessage.listenPort() + port)
})
