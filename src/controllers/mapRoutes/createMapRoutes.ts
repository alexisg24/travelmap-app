import { Request, Response } from 'express'
import { MapRoutesRequestPayload } from '../../types'
import { serverErrorsHandler } from '../../middlewares'
import { createWaypointFn } from '../../utils'
import { prisma } from '../../db/prismaInstance'
import { errorJson } from '../../helpers/errorJson'

export const createMapRoutes = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json(errorJson('User not found'))
  const { id } = req.authUser
  const { title, cords1, cords2 } = (req.body as MapRoutesRequestPayload)
  try {
    const [cords1Item, cord2Item] = await Promise.all([
      createWaypointFn(id, cords1.lat, cords1.lng),
      createWaypointFn(id, cords2.lat, cords2.lng)

    ])

    const mapRoute = await prisma.route.create({
      data: {
        user_id: id,
        title,
        waypoint1_id: cords1Item.id,
        waypoint2_id: cord2Item.id
      }
    })

    return res.status(201).json({ ok: true, route: mapRoute })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
