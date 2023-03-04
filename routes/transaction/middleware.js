import Validator from 'validatorjs'
import { PAGINATION_SETTING } from '@root/utils/constants'

const httpConstants = require('http2').constants

export const verifyInput = (req, res, next) => {
  const { page = PAGINATION_SETTING.DEFAULT_PAGE, size = PAGINATION_SETTING.PAGE_SIZE } = req.body
  const params = {
    ...req.body,
    page,
    size,
  }
  const validation = makeValidation(params)
  if (validation.fails()) {
    return res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).json({
      message: 'Validation input error',
      error: validation.errors.all(),
    })
  }
  req.body = params
  return next()
}
const makeValidation = (inputs) => {
  const rules = {
    walletId: 'string',
    page: 'integer|min:1',
    size: 'integer|min:1',
  }
  return new Validator(inputs, rules)
}
