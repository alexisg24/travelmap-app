import { Request, Response } from 'express'
import { errorJson } from '../helpers/errorJson'

export const serverErrorsHandler = (err: unknown, _req: Request, res: Response): Response => {
  console.log(err)
  return res.status(500).json(errorJson('Internal Server Error'))
}
