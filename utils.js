import dotenv from 'dotenv'
dotenv.config()

import ApiError from './exception/apiError.js'

import jwt from 'jsonwebtoken'
import multer from 'multer'


export const generateToken = (payload, expiresIn) => {
  return jwt.sign({...payload}, process.env.SECRET_KEY, { expiresIn })
}


export const verifyToken = token => {
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY)


    return data
  } catch (err) {
    throw ApiError.ErrorAccess('Неверный токен')
  }
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, Date.now())
  }
})

export const upload = multer({ storage })
