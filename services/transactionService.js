import { getTransactionByFilter } from '@root/repository/transactionRepository'

export const getListTransaction = async (params) => {
  let transactions
  const transactionLists = await getTransactionByFilter(params)
  if (transactionLists.length > 0) {
    transactions = transactionLists.map((transactionList) => ({
      sender: transactionList.sender,
      recipient: transactionList.recipient,
      amount: transactionList.amount,
      transactionFee: transactionList.transactionFee,
      signature: transactionList.signature,
    }))
    return {
      pagination: {
        page: params.page,
        size: params.size,
        totalItem: transactions.length,
      },
      transactions,
    }
  }
  return {
    pagination: {
      page: params.page,
      size: params.size,
      totalItem: 1,
    },
    transactions: [
      {
        sender: 'dv3qDFk1DTF36Z62bNvrCXe9sKATA6xvVy6A798xxAS',
        recipient: 'vgcDar2pryHvMgPkKaZfh8pQy4BJxv7SpwUG7zinWjG',
        amountTransferred: 1,
        transactionFee: 5,
        signature: 'UmPNMcDdrHwua69G1fxxc1Mrcjvo4dS7boDLoRsCDoiYq55kC1DvknM31WvjWs2tdehFK4XkRHc3u7muErC1c7k',
      },
    ],
  }
}
