import db from '@root/config/mongodb'

const httpConstants = require('http2').constants

const MONGODB_CONNECTED = 1

export default async (req, res) => {
  if (db.readyState !== MONGODB_CONNECTED) {
    return res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: 'Unhealthy',
    })
  }
  return res.json({
    message: 'Healthy',
  })
}
