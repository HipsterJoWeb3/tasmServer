import bcrypt from 'bcrypt'
import UserModel from '../models/UserModel.js'
import { generateToken, verifyToken } from '../utils.js'
import ApiError from '../exception/apiError.js'


export const authLoginService = async ({email, password}) => {
  const user = await UserModel.findOne({email})
  if(!user) throw ApiError.BadRequest('Пользователь не был найден')

  const isValidPass = await bcrypt.compare(password, user._doc.passwordHash)
  if(!isValidPass) throw ApiError.BadRequest('Неверный пароль')

  const token = generateToken({_id: user._id}, '30d')
  return {token, user}
}


export const authRegisterService = async ({email, password}) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const doc = new UserModel({
    email,
    passwordHash: hash
  })


  const user = await doc.save()

  const token = generateToken({_id: user._id}, '30d')
  const {passwordHash, ...userData} = user._doc

  return {token, userData}
}



export const checkTokenService = async token => {
  if(!token) throw ApiError.BadRequest('Неверный запрос')

  const { email } = verifyToken(token)

  const user = await UserModel.findOne({email})

  if(user) throw ApiError.BadRequest('Пользователь уже существует')

  return email
}



export const getMeService = async (userId) => {
  const user = await UserModel.findById(userId)
  if(!user) throw ApiError.BadRequest('Пользователь не найден')
  const {passwordHash, ...userData} = user._doc

  return userData
}
