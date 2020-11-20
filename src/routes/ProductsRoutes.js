const express = require('express')
const router = express.Router()
const ProductsController = require('../controllers/ProductsController')
const { logger } = require('../utils/logger')
const { loadLogs } = require('../routes/logsRouter')

router.get('/', async (req, res) => {
  try {
    const products = await ProductsController.getProducts(req.query, req.headers)
    res.status(200).json(products)
  } catch (err) {
    logger.error('Received Error of webhook &&' + JSON.stringify(err))
    res.status(500).json({ success: false, message: 'Manual Review Failed', err })
  }
})

router.get('/recommendations', async (req, res) => {
  try {
    const products = await ProductsController.getProductsRecommentations(req.headers)
    res.status(200).json(products)
  } catch (err) {
    logger.error('Received Error of webhook &&' + JSON.stringify(err))
    res.status(500).json({ success: false, message: 'Manual Review Failed', err })
  }
})

router.get('/test', (req, res) => {
  res.status(200).send('Products route test! OK!')
})

router.get('/logs', loadLogs)

module.exports = router
