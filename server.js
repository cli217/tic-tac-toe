'use strict'

const express = require('express')
const path = require('path')
const volleyball = require('volleyball')

const app = express()

app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static(path.join(__dirname, './public')))


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app
