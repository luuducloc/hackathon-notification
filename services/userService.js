import { createNewUser } from '@root/repository/userRepository.js'
import { ErrorResponse } from '@root/utils/errorUtils'
import { ERROR_CODE, HTTP_STATUS } from '@root/utils/constants'

export const createNewUserService = async (data) => {
  const newUser = await createNewUser(data)
  if (!newUser) {
    throw new ErrorResponse(ERROR_CODE.CANNOT_CREATE_USER, 'Cannot create new user.', HTTP_STATUS.UNAUTHORIZED)
  }
  return newUser
}
