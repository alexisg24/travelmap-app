import { Request, Response } from 'express'
import { serverErrorsHandler } from '../../middlewares'
import { prisma } from '../../db/prismaInstance'

export const deleteMapRoutes = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json({ message: 'User not found' })
  const { id } = req.authUser
  const { mapRouteID } = req.params
  try {
    const deletedMapRoute = await prisma.route.delete({ where: { id: +mapRouteID, user_id: id } })
    return res.status(201).json({ ok: true, deletedMapRoute })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
