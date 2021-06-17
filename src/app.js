'use strict'

const express = require('express')
// const bodyParser = require('body-parser')
const path = require('path')

const ProductsRouter = require('./routes/ProductsRouter')
const HealthRouter = require('./routes/HealthRouter')

var app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

app.use('/v1/healthCheck/systemInformation', HealthRouter)
app.use('/v1/products', ProductsRouter)

module.exports = app
