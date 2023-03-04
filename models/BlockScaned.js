import mongoose from 'mongoose'
import db from '@root/config/mongodb'

const BlocScan = new mongoose.Schema({
  lastBlock: {
    type: String,
    unique: true,
  },
})

export default db.model('BlocScan', BlocScan)
