import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { encryptPassword } from '../../utils/encrypt'
import { serverErrorsHandler } from '../../middlewares'
const prisma = new PrismaClient()

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  if (req.checkUser !== null) return res.status(400).json({ message: 'Email already in use!' })

  const { name, lastname, username, email, password } = req.body
  try {
    const newPassword = await encryptPassword(password)
    const user = await prisma.user.create({
      data: { name, lastname, username, email, password: newPassword }
    })
    return res.status(201).json(user)
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
