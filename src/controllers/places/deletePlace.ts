import { Request, Response } from 'express'
import { serverErrorsHandler } from '../../middlewares'
import { prisma } from '../../db/prismaInstance'
import { deleteWaypointFn } from '../../utils'

export const deletePlace = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json({ message: 'User not found' })
  const { id } = req.authUser
  const { placeId } = req.params
  try {
    const deletedPlace = await prisma.place.delete({ where: { id: +placeId } })
    if (deletedPlace == null) return res.status(404).json({ message: 'Place not found' })
    await deleteWaypointFn(id, deletedPlace.waypoint_id)
    return res.status(201).json({ ok: true, place: deletedPlace })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
