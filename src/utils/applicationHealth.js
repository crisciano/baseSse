const so = require('os')
const { ENVIRONMENT_OCC } = require('../config/env')

const status = (req, res) => {
  return new Promise((resolve, reject) => {
    const obj = {}
    try {
      obj.host_node_version = process.version
      obj.host_system = so.type()
      obj.host_system_version = so.release()
      obj.message = 'ok, received request!'
      obj.env = ENVIRONMENT_OCC
      resolve(obj)
    } catch (error) {
      obj.error = error
      reject(obj)
    }
  })
}

module.exports = { status }
