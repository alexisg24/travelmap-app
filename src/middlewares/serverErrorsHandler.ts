import { Request, Response } from 'express'

export const serverErrorsHandler = (err: unknown, _: Request, res: Response): Response => {
  console.log(err)
  return res.status(500).json({
    ok: false,
    message: 'Internal server error'
  })
}
