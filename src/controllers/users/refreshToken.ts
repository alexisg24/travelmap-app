import { Request, Response } from 'express'
import { generateJWT } from '../../utils/generateJWT'
import { serverErrorsHandler } from '../../middlewares'
import { errorJson } from '../../helpers/errorJson'

export const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (req.authUser == null) return res.status(400).json(errorJson('User not found'))
    const { id, username } = req.authUser
    const userJWT = await generateJWT({ id, username })
    return res.status(200).send({ ok: true, accessToken: userJWT })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
