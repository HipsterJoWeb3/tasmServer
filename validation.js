
import { body } from 'express-validator'

export const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({min: 5}),
  body('avatarUrl').optional().isURL(),
]

export const loginValidation = [
  body('email').isEmail(),
  body('password').isLength({min: 5}),
]

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи (больше 5 символов)').isLength({min: 5}).isString(),
  body('text', 'Введите текс статьи').isLength({min: 10}).isString(),
  body('imageURL', 'Неверная ссылка на изображение').optional().isString(),
]
