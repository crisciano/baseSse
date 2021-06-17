const env = require('../utils/EnvironmentVariables')
const axios = require('axios')

const { logger } = require('../utils/logger')
const { genericError } = require('../utils/Message')

class ProductsService {
  constructor () {
    this.url = env.base_store()
    this.apiKey = env.api_key()
  }

  /**
   *
   * @param {String} token
   * @param {Object} query
   * @returns promise
   */
  async searchProducts (query, headers) {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          method: 'get',
          url: `${this.url}${env.endpoint_search()}`,
          headers: {
            // Authorization: `Basic ${env.login_store()}`,
            Authorization: headers.authorization,
            'Content-Type': 'application/json'
          },
          params: query
        }
        axios(options)
          .then(res => resolve(res.data))
          .catch(err => {
            global.occ.logger.error(genericError('searchProducts - axios', err))
            reject(err)
          })
      } catch (err) {
        global.occ.logger.error(genericError('searchProducts', err))
        reject(err)
      }
    })
  }

  /**
   *
   * @param {String} token
   * @param {String} id
   * @param {String} priceListGroupId
   */
  async getProducts (ids, headers) {
    return new Promise((resolve, reject) => {
      try {
        // const endpoint = env.endpoint_products().replace('{ids}', ids).replace('{storePriceListGroupId}', priceListGroupId)
        const options = {
          method: 'get',
          url: `${this.url}${env.endpoint_products().replace('{ids}', ids)}`,
          headers: {
            // Authorization: `Basic ${env.login_store()}`,
            Authorization: headers.authorization,
            'Content-Type': 'application/json'
          }
        }
        axios(options)
          .then(res => resolve(res.data.items))
          .catch(err => {
            global.occ.logger.error(genericError('getProduct - axios', err))
            reject(err)
          })
      } catch (err) {
        global.occ.logger.error(genericError('getProduct', err))
        reject(err)
      }
    })
  }

  /**
   *
   * @param {String} token
   * @param {String} ids
   */
  async getStockProducts (ids, headers) {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          method: 'get',
          url: `${this.url}${env.endpoint_stockStatus().replace('{ids}', ids)}`,
          headers: {
            // Authorization: `Basic ${env.login_store()}`,
            Authorization: headers.authorization,
            'Content-Type': 'application/json'
          }
        }
        axios(options)
          .then(res => resolve(res.data.items))
          .catch(err => {
            // console.error(err);
            global.occ.logger.error(genericError('getStockProducts - axios', err))
            reject(err)
          })
      } catch (err) {
        global.occ.logger.error(genericError('getStockProducts', err))
        reject(err)
      }
    })
  }
}

module.exports = new ProductsService()
