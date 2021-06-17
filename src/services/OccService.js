
const axios = require('axios')
const env = require('../utils/EnvironmentVariables')
const urlLib = require('url')

const { logger } = require('../utils/logger')
const { genericError } = require('../utils/Message')

class OccService {
  authenticate () {
    return new Promise((resolve, reject) => {
      try {
        const optionsLogin = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${env.api_key()}`
          }
        }

        const params = new urlLib.URLSearchParams({
          grant_type: 'client_credentials'
        })

        const urlLogin = `${env.base_url()}${env.endpoint_login()}`

        axios.post(urlLogin, params.toString(), optionsLogin)
          .then((response) => {
            resolve(response.data.access_token)
          })
          .catch((err) => {
            global.occ.logger.error(genericError('authenticate - axios', err))
            reject(err)
          })
      } catch (err) {
        global.occ.logger.error(genericError('authenticate', err))
        reject(err)
      }
    })
  }

  getSettings () {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          method: 'get',
          url: `${env.base_store()}${env.endpoint_settings()}`,
          headers: {
            Authorization: `Basic ${env.login_store()}`,
            'Content-Type': 'application/json'
          }
        }
        axios(options)
          .then(res => resolve(res.data.siteSettings.siteSettingsApp))
          .catch((err) => {
            global.occ.logger.error(genericError('getSettings - axios', err))
            reject(err)
          })
      } catch (error) {
        global.occ.logger.error(genericError('getSettings', error))
        reject(error)
      }
    })
  }
}

module.exports = new OccService()
