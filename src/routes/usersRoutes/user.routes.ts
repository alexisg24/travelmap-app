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
 * /api/v1/users/register:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Register a new user, using the provided parameters.
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 *
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Login an existing user, using email and password.
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
 *              $ref: '#/components/schemas/LoginResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 *
 * /api/v1/users/refresh:
 *   get:
 *     tags:
 *       - Authentication
 *     description: Refresh the token of an existing user.
 *     parameters:
 *     - name: x-access-token
 *       in: header
 *       description: User Auth Token
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/TokenResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 */
