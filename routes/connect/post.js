import { createNewUserService } from '@root/services/userService.js'
import { handleError } from '@root/utils/errorUtils'
import { HTTP_STATUS } from '@root/utils/constants'

export default async (req, res) => {
  try {
    console.log(req.body)
    const newUser = await createNewUserService(req.body)
    return res.status(HTTP_STATUS.OK).json({ newUser })
  } catch (error) {
    console.log(error)
    // logger.error(error)
    return handleError(error, res)
  }
}
