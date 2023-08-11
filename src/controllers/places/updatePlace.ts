import { Request, Response } from 'express'
import { PlaceRequestPayload } from '../../types'
import { serverErrorsHandler } from '../../middlewares'
import { prisma } from '../../db/prismaInstance'
import { updateWaypointFn } from '../../utils'
import { errorJson } from '../../helpers/errorJson'

export const updatePlace = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json(errorJson('User not found'))
  const { id } = req.authUser
  const { placeId } = req.params
  const { title, comment, cords } = (req.body as PlaceRequestPayload)
  try {
    const updatePlace = await prisma.place.update({ data: { title, comment }, where: { id: +placeId } })
    await updateWaypointFn(id, updatePlace.waypoint_id, cords.lat, cords.lng)
    const result = await prisma.place.findFirst({
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
      where: { id: +placeId }
    })
    return res.status(201).json({ ok: true, place: result })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
