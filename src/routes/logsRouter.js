const { logger } = require('../utils/logger')
const fs = require('fs')
const url = require('url')

exports.loadLogs = (req, res) => {
  try {
    // eslint-disable-next-line node/no-deprecated-api
    const urlParts = url.parse(req.url, true)
    const query = urlParts.query

    const logToRemove = query.remove
    // eslint-disable-next-line eqeqeq
    if (logToRemove != null && logToRemove != '' && logToRemove != 'undefined') {
      return removeFile(res)
    }
    // eslint-disable-next-line eqeqeq
    if (logger.transports[1] && logger.transports[1].name == 'file') {
      let logPath = query.path
      // eslint-disable-next-line eqeqeq
      if (logPath == null || logPath == '' || logPath == 'undefined') {
        logPath = logger.transports[1].dirname + '/' + logger.transports[1].filename
      }
      const sizeFile = getSizeFile(logPath)
      if (sizeFile > 5) {
        removeFile(res, true)
      }

      getAllFiles().then(files => {
        fs.access(logPath, function (exist) {
          if (!exist) {
            fs.readFile(logPath, 'utf-8', function (error, data) {
              let lines = []
              if (!error) lines = data.split(process.platform === 'win32' ? '\r\n' : '\n')
              // return res.status(200).json(data);
              const logsToSend = []
              lines = lines.filter((line) => line)
              try {
                lines.forEach((line) => {
                  const newLine = { message: '', level: '' }
                  const data = JSON.parse(line)
                  const payload = data.message.trim().split('&&')
                  if (payload.length > 1) {
                    try {
                      newLine.message = payload[0].trim()
                      newLine.payload = JSON.parse(payload[1].trim())
                      newLine.level = data.level
                      logsToSend.push(newLine)
                    } catch (err) {
                      logsToSend.push(data)
                    }
                  } else logsToSend.push(data)
                })
              } catch (err) {
                // eslint-disable-next-line eqeqeq
                if (req.query.sse == 'true') {
                  return res.status(200).json(lines)
                }
              }
              // eslint-disable-next-line eqeqeq
              if (req.query.sse == 'true') {
                res.status(200).json(logsToSend)
              } else {
                res.render('../public/views/logs', { lines: lines, files: files })
              }
            })
          } else {
            // eslint-disable-next-line eqeqeq
            if (req.query.sse == 'true') {
              res.status(200).json({ Erro: 'Erro ao processar o arquivo' })
            } else {
              res.render('../public/views/logs', { lines: [], files: files })
            }
          }
        })
      }).catch(error => {
        logger.error('LogsRouter: - ' + error)
        res.status(500).json('Error')
      })
    } else {
      res.render('../public/views/logs', { lines: ['- && - && LOG BASEADO EM ARQUIVO DESATIVADO'], files: [] })
    }
  } catch (error) {
    logger.error('LogsRouter: - ' + error)
    res.status(500).json('Error')
  }
}

function removeFile (res, next = false) {
  fs.readdir(logger.transports[1].dirname + '/', function (err, filenames) {
    if (!err) {
      filenames.forEach(function (filename) {
        const path = logger.transports[1].dirname + '/' + filename
        fs.access(path, function (exist) {
          if (!exist) {
            fs.truncate(path, 0, function () { })
          }
        })
      })
      if (!next) {
        return res.status(200).json('OK')
      }
    }
  })
}

function getAllFiles () {
  return new Promise((resolve, reject) => {
    fs.readdir(logger.transports[1].dirname + '/', function (err, filenames) {
      const files = []
      if (err) {
        reject(files)
      } else {
        filenames.forEach(function (filename) {
          fs.access(logger.transports[1].dirname + '/' + filename, function (exist) {
            if (!exist) {
              const file = { filename: '', lastmodified: new Date(), contextPath: logger.transports[1].dirname }
              file.filename = filename
              files.push(file)
            }
          })
        })
        resolve(files)
      }
    })
  })
}

function getSizeFile (path) {
  const stats = fs.statSync(path)
  const fileSizeInBytes = stats.size
  const fileSizeInMegabytes = fileSizeInBytes / 1000000.0
  return fileSizeInMegabytes
}
