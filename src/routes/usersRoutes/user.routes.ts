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
/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Authentication
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AuthenticationUser'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 accessToken:
 *                   type: string
 *                   example: "<KEY>"
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 */
