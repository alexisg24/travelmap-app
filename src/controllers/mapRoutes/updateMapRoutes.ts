import { Request, Response } from 'express'
import { MapRoutesRequestPayload } from '../../types'
import { serverErrorsHandler } from '../../middlewares'
import { updateWaypointFn } from '../../utils'
import { prisma } from '../../db/prismaInstance'
import { errorJson } from '../../helpers/errorJson'

export const updateMapRoutes = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json(errorJson('User not found'))
  const { id } = req.authUser
  const { mapRouteID } = req.params
  const { title, cords1, cords2 } = (req.body as MapRoutesRequestPayload)
  try {
    const newMapRoute = await prisma.route.update({ data: { title }, where: { id: +mapRouteID, user_id: id } })
    await Promise.all([
      updateWaypointFn(id, newMapRoute.waypoint1_id, cords1.lat, cords1.lng),
      updateWaypointFn(id, newMapRoute.waypoint2_id, cords2.lat, cords2.lng)
    ])
    const result = await prisma.route.findFirst({
      select: {
        id: true,
        title: true,
        waypoint1: { select: { cords: true } },
        waypoint2: { select: { cords: true } }
      },
      where: {
        id: +mapRouteID,
        user_id: id
      }
    })

    return res.status(201).json({ ok: true, route: result })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
