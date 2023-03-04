import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import restRouter from 'express-rest-routerss'
import 'dotenv/config'
import * as rTracer from 'cls-rtracer'
import { logger, middlewareLogger } from '@root/config/logger'
import { HTTP_STATUS } from '@root/utils/constants'
import { getAllTransactionsForBlocks, getCurrentBlock } from '@root/utils/transactions'

const app = express()

// Enable CORS and body parse
app.use(cors(), express.json(), express.urlencoded({ extended: true }), rTracer.expressMiddleware())

process.on('uncaughtException', (error) => {
  logger.error(error)
})

app.use(middlewareLogger)

app.use(restRouter({ routeDir: '/routes' }))

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  logger.error(error)
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
  })
})

const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

setInterval(getCurrentBlock, 10000)
getAllTransactionsForBlocks(199650128, 199650128).then((transactions) => console.log(transactions))
app.listen(port, () => {
  logger.info(`Listening: http://${host}:${port}`)
})
