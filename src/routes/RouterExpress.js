
const { ProductsRoutes } = require('./ProductsRoutes')

class RouterExpress {
  constructor (app) {
    this.router = app
    this.routes()
  }

  routes () {
    this.router.use('/v1/products', ProductsRoutes)
  }
}

exports.RouterExpress = RouterExpress
