const ProductsService = require('../services/ProductsService')

const { logger } = require('../utils/logger')
const { ProductList } = require('../models/ProductList')
const { Helpers } = require('../helpers/Helpers')

const { genericError } = require('../utils/Message')
const OccService = require('../services/OccService')

class ProductsController {
  /**
     *
     * @param {object} query
     */
  async getProducts (query, headers) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const products = await ProductsService.searchProducts(query, headers)

        const resultList = products.resultsList
        const records = resultList.records
        const navigation = products.navigation.navigation
        // create new navigation
        const newNavigation = navigation.map(nav => Helpers.sanitizeNavigation(nav))
        // create list with respocitoryIds
        const listRepositoryIds = records.map(item => item.attributes['product.repositoryId'][0]).join(',') // return 1672,8387,92602,...

        // search productStock
        const productsStock = await ProductsService.getStockProducts(listRepositoryIds, headers)
        // search productStock
        const productsInfo = await ProductsService.getProducts(listRepositoryIds, headers)
        // create new resultList
        const newResultList = records.map((record, key) => Helpers.sanitizeProducts(record, productsStock[key], productsInfo[key]))
        // result list salary
        // const orderResultList = Helpers.sortByKey(newResultList, 'availability')
        // filter in stock
        const fillInStock = newResultList.filter(product => product.availability === 'IN_STOCK')
        // ordenation in stock
        const ordernationInStock = query.Ns ? Helpers.sortInStock(fillInStock, query.Ns) : fillInStock
        // filter out of stock
        const fillOutOfStock = newResultList.filter(product => product.availability === 'OUT_OF_STOCK')

        // instacia o productList
        const productList = new ProductList()
        // popula o productList
        productList.setResultList([...ordernationInStock, ...fillOutOfStock])
        // productList.setResultList(orderResultList)
        productList.setTotalNumRecs(resultList.totalNumRecs) // 55
        productList.setFirstRecNum(resultList.firstRecNum) // no = 0 | nrpp = 3 result 4
        productList.setLastRecNum(resultList.lastRecNum) // no = 0 | nrpp = 3 result 4 + 3
        productList.setNavigation(newNavigation)

        resolve(productList.getProductList() || [])
      } catch (err) {
        console.log('getProduts controller', err)
        logger.error(genericError('getProducts controller', err))
        return reject(err)
      }
    })
  }

  async getProductsRecommentations (headers) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        // get setings extensions
        const { productsRecomendations } = await OccService.getSettings()

        let orderResultList = []

        // check products recomendations
        if (productsRecomendations) {
          // search productStock
          const productsStock = await ProductsService.getStockProducts(productsRecomendations)
          // search productStock
          const productsInfo = await ProductsService.getProducts(productsRecomendations, headers)
          // create new resultList
          const newResultList = productsInfo.map((record, key) => Helpers.sanitizeProductsRecommendations(record, productsStock[key], productsInfo[key]))
          // result list salary
          orderResultList = Helpers.sortByKey(newResultList, 'availability')
        }

        // instacia o productList
        const productList = new ProductList()
        // popula o productList
        productList.setResultList(orderResultList)
        productList.setTotalNumRecs(orderResultList.length) // 55
        // productList.setFirstRecNum(resultList.firstRecNum) // no = 0 | nrpp = 3 result 4
        // productList.setLastRecNum(resultList.lastRecNum) // no = 0 | nrpp = 3 result 4 + 3
        productList.setNavigation([])

        resolve(productList.getProductList() || [])
      } catch (error) {
        return reject(error)
      }
    })
  }
}

module.exports = new ProductsController()
