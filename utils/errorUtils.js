import { ERROR_CODE, HTTP_STATUS } from '@root/utils/constants'

export class ErrorResponse extends Error {
  constructor(errorCode, message, httpStatus) {
    super(message)
    this.errorCode = errorCode
    this.httpStatus = httpStatus
  }
}

export const handleError = (error, res) => {
  const { errorCode, message, httpStatus } = error
  if (Object.values(ERROR_CODE).indexOf(errorCode) === -1) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      errorCode: ERROR_CODE.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    })
  }
  return res.status(httpStatus).json({ errorCode, message })
}
