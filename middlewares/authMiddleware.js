import { verifyToken } from '../utils.js'


import ApiError from '../exception/apiError.js'

export default (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if(!token) throw ApiError.ErrorAccess('Нет доступа')

    const decoded = verifyToken(token)

    req.userId = decoded._id

    next()
  } catch (err) {
    throw ApiError.ErrorAccess('Нет доступа')
  }
}
