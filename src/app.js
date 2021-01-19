require('dotenv').config()
const express = require('express')
const errorHandler = require('./errorHandler')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
// we need this for logging purposes
const { NODE_ENV } = require('./config')

// create app
const app = express()


const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

// to test app is working 
app.get('/', (req, res) => {
  res.send('Welcome to the pokeserver!')
})


app.use(errorHandler)

module.exports = app
