

import express from 'express'
import userController from '../Controllers/userController'
const userRouter = express.Router()

userRouter.route('/signup').post(userController.signUp)
export default userRouter