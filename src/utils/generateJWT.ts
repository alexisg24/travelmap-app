import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types'

export const generateJWT = async ({ id, username }: JwtPayload): Promise<string> => {
  const payload: JwtPayload = { id, username }
  return await new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_USER_SECRET as string,
      { expiresIn: '2h' },
      (err, token) => {
        if (err != null || token === undefined) {
          console.log(err)
          return reject(Error('Failed to generate JWT'))
        }
        return resolve(token)
      })
  })
}
