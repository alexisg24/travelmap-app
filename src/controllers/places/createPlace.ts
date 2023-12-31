import { Request, Response } from 'express'
import { PlaceRequestPayload } from '../../types'
import { serverErrorsHandler } from '../../middlewares'
import { prisma } from '../../db/prismaInstance'
import { createWaypointFn } from '../../utils/createWaypointFn'
import { errorJson } from '../../helpers/errorJson'

export const createPlace = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json(errorJson('User not found'))
  const { id } = req.authUser
  const { title, comment, cords } = (req.body as PlaceRequestPayload)
  try {
    const createWaypoint = await createWaypointFn(id, cords.lat, cords.lng)
    const newPlace = await prisma.place.create({
      select: {
        id: true,
        title: true,
        comment: true,
        waypoint: {
          select: {
            cords: true
          }
        }
      },
      data: {
        title,
        comment: comment ?? '',
        waypoint_id: createWaypoint.id,
        user_id: id
      }
    })
    return res.status(201).json({ ok: true, place: newPlace })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
