const express = require('express')
const app = express()
const logger = require('./logger')
const httpLogger = require('./httpLogger')

app.get('/bam', (req, res, next) => {
  console.log('Bam!')
  res.status(200).send('Bam!')
})

app.use(httpLogger)

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World!')
})

app.get('/boom', (req, res, next) => {
  try {
    throw new Error('Wowza!')
  } catch (error) {
    logger.error('Whooops! This broke with error: ', error)
    res.status(500).send('Error!')
  }
})

const port = process.env.PORT || 3000
app.listen(port, () =>
  logger.info(`Express.js listening on port ${port}.`))
