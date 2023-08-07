/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginUser, refreshToken, registerUser } from '../../controllers/users'
import { validateJWTMiddleware, verifyIfUserExist, verifyIfUsernameExist } from '../../middlewares'
import { validateZod } from '../../middlewares/validateSchemas'
import { loginSchema, registerSchema } from '../../schemas'

const userRouter = Router()

userRouter.post('/register', validateZod(registerSchema), verifyIfUserExist, verifyIfUsernameExist, registerUser)
userRouter.post('/login', validateZod(loginSchema), verifyIfUserExist, loginUser)
userRouter.get('/refresh', validateJWTMiddleware, refreshToken)

export { userRouter }
