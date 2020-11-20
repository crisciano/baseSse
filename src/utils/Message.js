module.exports = {
  listenPort () {
    return 'Servidor escutando na porta '
  },
  genericError (func, err) {
    return `Error in ${func}: ${err}`
  }
}
