import { Connection } from '@solana/web3.js'
import { findUserByWallet } from '@root/repository/userRepository'
import bs58 from 'bs58'
import BlockScaned from '@root/models/BlockScaned'
import Transactions from '@root/models/Transactions'

const connection = new Connection('https://api.devnet.solana.com')
export const getAllTransactionsForBlocks = async (startBlockSlot, endBlockSlot) => {
  const blockRange = await connection.getBlocks(startBlockSlot, endBlockSlot, 'finalized')
  const listTxs = []
  const transactions = await Promise.all(
    blockRange.map(async (block) => {
      const blockDetails = await connection.getConfirmedBlock(block)
      return await Promise.all(
        blockDetails.transactions.map(async (tx) => {
          const sender = tx.transaction._message.accountKeys[0].toBase58()
          const recipient = tx.transaction._message.accountKeys[1].toBase58()
          const user = await findUserByWallet(recipient)
          if (user) {
            const instructionData = tx.transaction._message.instructions[0].data
            let amountTransferred
            try {
              amountTransferred = Buffer.from(instructionData, 'base64').readUInt32LE(0)
              amountTransferred = Number(amountTransferred) / Math.pow(10, 9)
            } catch (error) {
              amountTransferred = 0
            }
            const transactionFee = tx.meta.fee || 0
            // const signature = binary_to_base58(tx?.transaction?.signature)
            // const signature = (tx?.transaction?.signature).toBase58()
            const signature = bs58.encode(tx.transaction.signature)
            listTxs.push({
              sender,
              recipient,
              amountTransferred,
              transactionFee,
              signature,
            })

            return {
              sender,
              recipient,
              amountTransferred,
              transactionFee,
              // signature,
            }
          }
        })
      )
    })
  )
  // return transactions.flat()
  return listTxs
}

// getAllTransactionsForBlocks(199626252, 199626252).then((transactions) => console.log(transactions))
export const getCurrentBlock = async () => {
  BlockScaned.find()
    .then((res) => {
      console.log(res[0].lastBlock)
      getAllTransactionsForBlocks(Number(res[0].lastBlock), Number(res[0].lastBlock)).then((transactions) => {
        console.log(transactions)
        Transactions.create(transactions).then((tran) => {
          BlockScaned.findOneAndUpdate({ _id: res[0]._id }, { lastBlock: Number(res[0].lastBlock) + 1 }).then(() => {
            console.log('update Block Scaned')
          })
        })
      })
    })
    .catch((err) => {
      console.error(err)
    })
}
