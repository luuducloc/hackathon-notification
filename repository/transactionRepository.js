import Transactions from '@root/models/Transactions'

export const createTransaction = (data) => Transactions.create(data)
