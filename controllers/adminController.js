import {
  authLoginService,
  authRegisterService,
  checkTokenService,
  getMeService
} from '../services/userService.js'
import mailService from '../services/mailService.js'


import { generateToken } from '../utils.js'

import ApiError from '../exception/apiError.js'

class AdminController {
  async login(req, res, next) {
    try {

      const {token, user} = await authLoginService(req.body)



      return res.status(200).json({
        ...user._doc,
        token
      })
    } catch(e) {

      next(e)
    }
  }

  async sendLink(req, res, next) {
    try {
      const { email } = req.body

      const token = generateToken({email}, '24h')

      await mailService.sendActivationMail(email, `${process.env.API_URL}/registration?auth_token=${token}`)

      return res.status(200).json(token)

    } catch(e) {
      next(e)
    }
  }

  async checkLink(req, res, next) {
    try {

      const { auth_token } = req.query

      const email = await checkTokenService(auth_token)

      return res.status(200).json({email})

    } catch(e) {
      next(e)
    }
  }


  async getMe(req, res, next) {
    try {
      const user = await getMeService(req.userId)

      return res.status(200).json(user)
    } catch(e) {
      next(e)
    }
  }

  async registration(req, res, next) {
    try {

      const data = await authRegisterService(req.body)

      return res.status(200).json(data)

    } catch(e) {
      next(e)
    }
  }

}


export default new AdminController()
