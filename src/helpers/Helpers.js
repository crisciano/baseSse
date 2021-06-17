const { Product } = require('../models/Product')

class Helpers {
  /**
     *
     * @param {array} array
     * @param {String} key
     */
  sortByKey (array, key) {
    return array.sort((a, b) => {
      if (a[key] > b[key]) return 1
      if (a[key] < b[key]) return -1
      return 0
    })
  }

  sortByKeyDesc (array, key) {
    return array.sort((a, b) => {
      if (a[key] > b[key]) return 1
      if (a[key] < b[key]) return -1
      return 0
    })
  }

  sortByKeyCres (array, key) {
    return array.sort((a, b) => {
      if (a[key] < b[key]) return 1
      if (a[key] > b[key]) return -1
      return 0
    })
  }

  sortInStock (array, ns) {
    // ordenar por unityPrice
    // query.Ns contem sku.activePrice
    // 0 menor para maior
    // 1 maior pra menor
    const key = 'unityPrice'
    return ns.includes('sku.activePrice')
      ? (
        ns.includes('0')
          ? this.sortByKeyCres(array, key)
          : this.sortByKeyDesc(array, key)
      )
      : array
  }

  /**
     *
     * @param {obj} obj
     * @param {obj} productStock
     */
  sanitizeProducts (obj, productStock, productInfos) {
    const item = obj.records[0].attributes

    // global.occ.logger.info(item)

    // obj product
    const repositoryId = item['product.repositoryId'][0]
    const displayName = item['product.displayName'][0]
    // const salePrices = item['product.salePrices'][0]
    const unity = (item['product.dellys_unity'] !== undefined) ? item['product.dellys_unity'][0] : ''
    const smallImages = item['product.primarySmallImageURL']
    const largeImages = item['product.largeImageURLs']
    const multiple = (item['product.dellys_multiple'][0] !== 'unid.') ? item['product.dellys_multiple'][0] : 1
    const listPrice = item['product.listPrice'][0] ? item['product.listPrice'][0] : 0
    // obj stock of product
    const quantity = productStock.productSkuInventoryStatus[repositoryId]
    const availability = quantity > 0 ? productStock.stockStatus : 'OUT_OF_STOCK'
    // obj infos of products
    const variableWeight = productInfos.dellys_variableWeight
    const description = productInfos.longDescription

    const product = new Product()

    product.setName(displayName)
    product.setUnity(unity)
    product.setSmallImage(smallImages)
    product.setLargeImage(largeImages)
    product.setCode(repositoryId)
    product.setCatRefId(repositoryId)
    product.setQuantity(quantity)
    product.setAvailability(availability)
    product.setMultiple(multiple)
    product.setPrice(listPrice)
    product.setUnityPrice()
    product.setVariableWeight(variableWeight)
    product.setDescription(description)
    product.setSalePrices(0)

    return product.getProduct()
  }

  sanitizeProductsRecommendations (obj, productStock, productInfos) {
    // global.occ.logger.info(Object.values(obj.salePrices)[0])
    // obj product
    const repositoryId = obj.repositoryId
    const displayName = obj.displayName
    const salePrices = Object.values(obj.salePrices)[0]
    const unity = (obj.dellys_unity !== undefined) ? obj.dellys_unity : ''
    const smallImages = [obj.primarySmallImageURL]
    const largeImages = obj.largeImageURLs
    const multiple = (obj.dellys_multiple !== 'unid.') ? obj.dellys_multiple : 1
    const listPrice = obj.listPrice ? obj.listPrice : 0
    // obj stock of product
    const quantity = productStock.productSkuInventoryStatus[repositoryId]
    const availability = quantity > 0 ? productStock.stockStatus : 'OUT_OF_STOCK'
    // obj infos of products
    const variableWeight = productInfos.dellys_variableWeight
    const description = productInfos.longDescription

    const product = new Product()

    product.setName(displayName)
    product.setUnity(unity)
    product.setSmallImage(smallImages)
    product.setLargeImage(largeImages)
    product.setCode(repositoryId)
    product.setCatRefId(repositoryId)
    product.setQuantity(quantity)
    product.setAvailability(availability)
    product.setMultiple(multiple)
    product.setPrice(listPrice)
    product.setUnityPrice()
    product.setVariableWeight(variableWeight)
    product.setDescription(description)
    product.setSalePrices(salePrices)

    return product.getProduct()
  }

  /**
     *
     * @param {obj} obj
     */
  sanitizeNavigation (obj) {
    return {
      displayName: obj.displayName,
      refinements: this.sanitizeRefinements(obj.refinements)
    }
  }

  /**
     *
     * @param {array} array
     */
  sanitizeRefinements (array) {
    return array.map(ref => {
      return {
        count: ref.count,
        label: ref.label,
        navigationState: ref.navigationState
      }
    })
  }
}

exports.Helpers = new Helpers()
