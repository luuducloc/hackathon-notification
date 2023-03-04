import Transactions from '@root/models/Transactions'

export const createTransaction = (data) => Transactions.create(data)

export const getTransactionByFilter = (params) => {
  const filter = {
    $or: [{ recipient: params.walletId }, { sender: params.walletId }],
  }
  const skipItem = Math.max(Number(params.size) * Number(params.page) - Number(params.size), 0)
  return Transactions.find(filter).skip(skipItem).limit(params.size).sort({ createdAt: -1 })
}
