const express = require('express')
const router = express.Router()
const AppHealth = require('../utils/applicationHealth')
const { logger } = require('../utils/logger')

router.get('/', function (req, res, next) {
  try {
    AppHealth.status(req, res)
  } catch (error) {
    const statusCode = error.response.status
    logger.error('Received Error of webhook &&' + JSON.stringify(error))
    res.status(statusCode).json({ success: false, message: 'Manual Review Failed', error })
  }
})

module.exports = router
