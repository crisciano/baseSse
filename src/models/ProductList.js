class ProductList {
  constructor () {
    this.resultList = []
    this.totalNumRecs = 0
    this.firstRecNum = 0
    this.lastRecNum = 0
    this.navigation = []
  }

  setResultList (resultList) {
    this.resultList = resultList
  }

  setTotalNumRecs (totalNumRecs) {
    this.totalNumRecs = totalNumRecs
  }

  setFirstRecNum (firstRecNum) {
    this.firstRecNum = firstRecNum
  }

  setLastRecNum (lastRecNum) {
    this.lastRecNum = lastRecNum
  }

  setNavigation (navigation) {
    this.navigation = navigation
  }

  getProductList () {
    return {
      resultList: this.resultList,
      totalNumRecs: this.totalNumRecs,
      firstRecNum: this.firstRecNum,
      lastRecNum: this.lastRecNum,
      navigation: this.navigation
    }
  }
}

exports.ProductList = ProductList
