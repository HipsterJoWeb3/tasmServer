import { Router } from 'express'

import adminController from '../controllers/adminController.js'
import postsController from '../controllers/postsController.js'
import validationMiddleware from '../middlewares/validationMiddleware.js'

import authMiddleware from '../middlewares/authMiddleware.js'

import { upload } from '../utils.js'


const router = new Router()

import { registerValidation, postCreateValidation, loginValidation } from '../validation.js'

router.post('/auth/login', loginValidation, validationMiddleware, adminController.login)
router.post('/auth/link', authMiddleware, adminController.sendLink)
router.get('/auth/link', adminController.checkLink)
router.get('/auth/me', authMiddleware, adminController.getMe)
router.post('/auth/registration', registerValidation, validationMiddleware, adminController.registration)

router.get('/posts/:category', postsController.getAll)
router.get('/post/:id', postsController.getPostById)
router.post('/posts', authMiddleware, postCreateValidation, validationMiddleware, postsController.addPost)
router.delete('/posts/:id', authMiddleware, postsController.removePost)
router.patch('/posts/:id', authMiddleware, postCreateValidation, validationMiddleware, postsController.editPost)

router.post('/upload', authMiddleware, upload.single('image'), postsController.upload)


export default router
