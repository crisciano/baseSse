const express = require('express')
const router = express.Router()
const AppHealth = require('../utils/applicationHealth')
const { logger } = require('../utils/logger')

router.get('/', function (req, res, next) {
  try {
    logger.info(genericInfo('Router healthCheck', 'Manual check'))
    const status = await AppHealth.status(req, res)
    res.status(200).json(status)
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500
    logger.error('Received Error of webhook &&' + JSON.stringify(error))
    res.status(statusCode).json({ success: false, message: 'Manual Review Failed', error })
  }
})

module.exports = router
