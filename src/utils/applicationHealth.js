const so = require('os')
const {ENVIRONMENT_OCC} = require('../config/env')

const status = (req, res) => {
  const obj = {}
  try {
    obj.host_node_version = process.version
    obj.host_system = so.type()
    obj.host_system_version = so.release()
    obj.message = 'ok, received request!'
    obj.env = ENVIRONMENT_OCC
    res.status(200).json(obj).end()
  } catch (error) {
    obj.error = error
    res.status(500).json(obj).end()
  }
}

module.exports = { status }
