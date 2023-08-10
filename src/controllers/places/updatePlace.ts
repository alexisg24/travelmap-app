import { Request, Response } from 'express'
import { PlaceRequestPayload } from '../../types'
import { serverErrorsHandler } from '../../middlewares'
import { prisma } from '../../db/prismaInstance'
import { updateWaypointFn } from '../../utils'

export const updatePlace = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json({ message: 'User not found' })
  const { id } = req.authUser
  const { placeId } = req.params
  const { title, comment, cords } = (req.body as PlaceRequestPayload)
  try {
    const updatePlace = await prisma.place.update({ data: { title, comment }, where: { id: +placeId } })

    await updateWaypointFn(id, updatePlace.waypoint_id, cords.lat, cords.lng)
    return res.status(201).json({ ok: true, place: updatePlace })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
