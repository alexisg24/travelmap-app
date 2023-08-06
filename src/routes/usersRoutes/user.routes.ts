/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginUser, refreshToken, registerUser } from '../../controllers/users'
import { validateJWTMiddleware, verifyIfUserExist, verifyIfUsernameExist } from '../../middlewares'
import { validateZod } from '../../middlewares/validateSchemas'
import { loginSchema, registerSchema } from '../../schemas'
import { cacheHandler } from '../../middlewares/requestCache'

const userRouter = Router()

userRouter.post('/register', validateZod(registerSchema), verifyIfUserExist, verifyIfUsernameExist, cacheHandler, registerUser)
userRouter.post('/login', validateZod(loginSchema), verifyIfUserExist, cacheHandler, loginUser)
userRouter.get('/refresh', validateJWTMiddleware, cacheHandler, refreshToken)

export { userRouter }
