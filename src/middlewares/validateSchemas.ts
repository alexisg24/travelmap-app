import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, z } from 'zod'
import { errorJson } from '../helpers/errorJson'

export const validateZod = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      return next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.issues.map((issue) => ({
          error: issue.message,
          path: issue.path.join('/')
        }))
        return res.status(400).json(errorJson(errors))
      }
      return res.status(400).json(errorJson('Internal Server Error'))
    }
  }
