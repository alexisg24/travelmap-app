import { Request, Response } from 'express'
import { WaypointPayload } from '../../types'
import { serverErrorsHandler } from '../../middlewares'
import { createWaypointFn } from '../../utils'

export const createWaypoint = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json({ message: 'User not found' })
  const { id } = req.authUser
  const { lng, lat } = (req.body as WaypointPayload)
  try {
    const newWaypoint = await createWaypointFn(id, lng, lat)
    return res.status(201).json(newWaypoint)
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
