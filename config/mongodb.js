import mongoose from 'mongoose'
import { logger } from '@root/config/logger'
import serverConfig from '@root/config/server'

mongoose.connect(serverConfig.get('mongodb.url')).catch((error) => {
    logger.error(error)
    process.exit(1)
})
const db = mongoose.connection
db.on('error', logger.error.bind(console, 'MongoDB connection error'))
export default db

