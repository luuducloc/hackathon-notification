import mongoose from 'mongoose'
import db from '@root/config/mongodb'

const Transactions = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  transactionFee: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
  },
})

export default db.model('transaction', Transactions)
