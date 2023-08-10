import { Request, Response } from 'express'
import { encryptPassword } from '../../utils/encrypt'
import { serverErrorsHandler } from '../../middlewares'
import { prisma } from '../../db/prismaInstance'
import { errorJson } from '../../helpers/errorJson'
import { generateJWT } from '../../utils'

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  if (req.checkUser !== null) return res.status(400).json(errorJson('Email is already in use'))

  const { name, lastname, username, email, password } = req.body
  try {
    const newPassword = await encryptPassword(password)
    const { id } = await prisma.user.create({
      data: { name, lastname, username, email, password: newPassword }
    })
    const userJWT = await generateJWT({ id, username })
    return res.status(201).json({ ok: true, accessToken: userJWT })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
