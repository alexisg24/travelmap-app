import { NextFunction, Request, Response } from 'express'
import { PlaceRequestPayload } from '../types'
import { serverErrorsHandler } from './serverErrorsHandler'
import { prisma } from '../db/prismaInstance'
import { formatCords } from '../helpers/formatCords'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const checkIfPlaceExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (req.authUser == null) return res.status(400).json({ message: 'User not found' })
  const { id } = req.authUser
  const { cords } = (req.body as PlaceRequestPayload)
  try {
    const formattedCords = formatCords(cords.lat, cords.lng)
    const findWaypoint = await prisma.waypoint.findFirst({ where: { cords: formattedCords, user_id: +id } })
    if (findWaypoint == null) return next()

    const findPlace = await prisma.place.findFirst({ where: { user_id: id, waypoint_id: findWaypoint.id } })
    if (findPlace == null) return next()

    return res.status(401).json({ ok: false, message: 'Place is already registered' })
  } catch (error) {
    serverErrorsHandler(error, req, res)
  }
}
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const checkIfPlaceNotExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (req.authUser == null) return res.status(400).json({ message: 'User not found' })
  const { id } = req.authUser
  const { placeId } = req.params
  try {
    const searchPlace = await prisma.place.findFirst({ where: { id: +placeId, user_id: id } })
    if (searchPlace == null) return res.status(404).json({ ok: false, message: 'Place not found' })
    return next()
  } catch (error) {
    serverErrorsHandler(error, req, res)
  }
}
