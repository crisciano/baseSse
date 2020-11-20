class Product {
  constructor () {
    this.name = ''
    this.unity = ''
    this.smallImage = []
    this.largeImage = []
    this.code = ''
    this.catRefId = ''
    this.quantity = ''
    this.availability = ''
    this.multiple = 0
    this.price = 0
    this.unityPrice = 0
    this.variableWeight = false
    this.description = ''
    this.salePrices = 0
  }

  setName (name) {
    this.name = name
  }

  setUnity (unity) {
    this.unity = unity
  }

  setSmallImage (smallImage) {
    this.smallImage = smallImage
  }

  setLargeImage (largeImage) {
    this.largeImage = largeImage
  }

  setCode (code) {
    this.code = code
  }

  setCatRefId (catRefId) {
    this.catRefId = catRefId
  }

  setQuantity (quantity) {
    this.quantity = quantity
  }

  setAvailability (availability) {
    this.availability = availability
  }

  setMultiple (multiple) {
    this.multiple = multiple
  }

  setPrice (price) {
    this.price = price
  }

  setUnityPrice () {
    this.unityPrice = this.price / this.multiple
  }

  setVariableWeight (variableWeight) {
    this.variableWeight = variableWeight
  }

  setDescription (description) {
    this.description = description
  }

  setSalePrices (salePrices) {
    this.salePrices = salePrices
  }

  getProduct () {
    return {
      name: this.name,
      unity: this.unity,
      smallImage: this.smallImage,
      largeImage: this.largeImage,
      code: this.code,
      catRefId: this.catRefId,
      quantity: this.quantity,
      availability: this.availability,
      multiple: Number(this.multiple),
      price: Number(this.price),
      unityPrice: Number(this.unityPrice),
      variableWeight: this.variableWeight,
      description: this.description,
      salePrices: this.salePrices
    }
  }
}

exports.Product = Product
