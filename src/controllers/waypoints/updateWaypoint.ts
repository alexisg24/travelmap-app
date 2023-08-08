import { Request, Response } from 'express'
import { WaypointPayload } from '../../types'
import { serverErrorsHandler } from '../../middlewares'
import { updateWaypointFn } from '../../utils'

export const updateWaypoint = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json({ message: 'User not found' })
  const { id } = req.authUser
  const { waypointId } = req.params
  const { lng, lat } = (req.body as WaypointPayload)
  try {
    const newWaypoint = await updateWaypointFn(id, +waypointId, lng, lat)
    return res.status(201).json(newWaypoint)
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
