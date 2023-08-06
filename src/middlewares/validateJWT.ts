import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const validateJWTMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const token = req.header('x-access-token')
  if (token === undefined || token === null) {
    return res.status(401).json({
      ok: false,
      msg: 'Header: x-access-token is required'
    })
  }

  try {
    const { id, username } = jwt.verify(token, (process.env.JWT_USER_SECRET as jwt.Secret)) as JwtPayload
    req.authUser = { id, username }
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid Token'
    })
  }

  return next()
}
