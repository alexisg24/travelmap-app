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
    const { waypoint1_id: waypoint1, waypoint2_id: waypoint2, ...deletedMapRoute } = await prisma.route.delete({
      select: {
        id: true,
        title: true,
        waypoint1_id: true,
        waypoint2_id: true,
        waypoint1: { select: { cords: true } },
        waypoint2: { select: { cords: true } }
      },
      where: { id: +mapRouteID, user_id: id }
    })
    await Promise.all([
      deleteWaypointFn(id, waypoint1),
      deleteWaypointFn(id, waypoint2)
    ])
    return res.status(201).json({ ok: true, route: deletedMapRoute })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
