const env = require('../config/env')

module.exports = {
  base_url () {
    return env.occ[env.ENVIRONMENT_OCC].adminUrl
  },
  api_key () {
    return env.occ[env.ENVIRONMENT_OCC].appKey
  },
  base_store () {
    return env.occ[env.ENVIRONMENT_OCC].storeUrl
  },
  login_store () {
    return Buffer.from('admin:admin').toString('base64')
  },
  endpoint_settings () {
    return '/ccstore/v1/sites/siteUS?fields=siteSettings.siteSettingsApp.productsRecomendations'
  },
  endpoint_search () {
    return '/ccstore/v1/search'
  },
  endpoint_login () {
    return '/ccstore/v1/login'
  },
  endpoint_products () {
    return '/ccstore/v1/products?productIds={ids}&preFilter=true&fields=repositoryId,displayName,dellys_unity,dellys_multiple,salePrices,listPrice,dellys_variableWeight,longDescription,description,primarySmallImageURL,largeImageURLs'
  },
  endpoint_stockStatus () {
    return '/ccstore/v1/stockStatus?products={ids}&fields=stockStatus,productSkuInventoryStatus'
  },
  port () {
    return process.env.PORT || 3000
  }
}
