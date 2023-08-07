/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import apicache from 'apicache'
import { loginUser, refreshToken, registerUser } from '../../controllers/users'
import { validateJWTMiddleware, verifyIfUserExist, verifyIfUsernameExist } from '../../middlewares'
import { validateZod } from '../../middlewares/validateSchemas'
import { loginSchema, registerSchema } from '../../schemas'
const cache = apicache.middleware

const userRouter = Router()

userRouter.post('/register', cache('1 minute'), validateZod(registerSchema), verifyIfUserExist, verifyIfUsernameExist, registerUser)
userRouter.post('/login', cache('1 minute'), validateZod(loginSchema), verifyIfUserExist, loginUser)
userRouter.get('/refresh', cache('1 minute'), validateJWTMiddleware, refreshToken)

export { userRouter }
