import { createNewUser } from '@root/repository/userRepository.js'
import { ErrorResponse } from '@root/utils/errorUtils'
import { ERROR_CODE, HTTP_STATUS } from '@root/utils/constants'
import User from '@root/models/User'

export const createNewUserService = async (data) => {
  const currentUser = User.findOne({ wallet: data.wallet })
  if (currentUser) {
    return currentUser
  }
  const newUser = await createNewUser(data)
  if (!newUser) {
    throw new ErrorResponse(ERROR_CODE.CANNOT_CREATE_USER, 'Cannot create new user.', HTTP_STATUS.UNAUTHORIZED)
  }
  return newUser
}
