import { NextFunction, Request, Response } from 'express'
import { UserSchema } from '../types'
import { serverErrorsHandler } from './serverErrorsHandler'
import { prisma } from '../db/prismaInstance'

export const verifyIfUserExist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body
  try {
    const findUser: (UserSchema | null) = await prisma.user.findUnique({ where: { email } })
    req.checkUser = findUser
  } catch (error) {
    serverErrorsHandler(error, req, res)
  }
  next()
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const verifyIfUsernameExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (req.checkUser != null) return next()
  const { username } = req.body
  try {
    const findUser: (UserSchema | null) = await prisma.user.findUnique({ where: { username } })
    if (findUser != null) return res.status(400).json({ message: 'Username already taken' })
  } catch (error) {
    serverErrorsHandler(error, req, res)
  }
  return next()
}
