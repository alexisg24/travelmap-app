import { Request, Response } from 'express'
import { serverErrorsHandler } from '../../middlewares'
import { prisma } from '../../db/prismaInstance'
import { errorJson } from '../../helpers/errorJson'
import { deleteWaypointFn } from '../../utils'

export const deleteMapRoutes = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json(errorJson('User not found'))
  const { id } = req.authUser
  const { mapRouteID } = req.params
  try {
    const deletedMapRoute = await prisma.route.delete({ where: { id: +mapRouteID, user_id: id } })
    await Promise.all([
      deleteWaypointFn(id, deletedMapRoute.waypoint1_id),
      deleteWaypointFn(id, deletedMapRoute.waypoint2_id)
    ])
    return res.status(201).json({ ok: true, route: deletedMapRoute })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
