import { HTTP_STATUS } from '@root/utils/constants'
import { handleError } from '@root/utils/errorUtils'
import { getListTransaction } from '@root/services/transactionService'

export default async (req, res) => {
  try {
    const params = req.body
    const transactions = await getListTransaction(params)
    return res.status(HTTP_STATUS.OK).json({ newUser: transactions })
  } catch (error) {
    return handleError(error, res)
  }
}
