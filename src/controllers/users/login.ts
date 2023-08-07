import { Request, Response } from 'express'
import { comparePassword } from '../../utils/encrypt'
import { generateJWT } from '../../utils/generateJWT'
import { serverErrorsHandler } from '../../middlewares'

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { password } = req.body
  try {
    if (req.checkUser == null) return res.status(400).json({ message: 'User not found' })
    const { id, username, password: checkUserPassword } = req.checkUser

    const validatePassword = await comparePassword(password, checkUserPassword)
    if (!validatePassword) return res.status(400).send('email or password incorrect')

    const userJWT = await generateJWT({ id, username })
    return res.status(200).send({ ok: true, accessToken: userJWT })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}