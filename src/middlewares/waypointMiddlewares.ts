import { NextFunction, Request, Response } from 'express'
import { prisma } from '../db/prismaInstance'
import { serverErrorsHandler } from './serverErrorsHandler'
import { errorJson } from '../helpers/errorJson'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const checkIfWaypointNotExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (req.authUser == null) return res.status(400).json(errorJson('User not found'))
  const { id } = req.authUser
  const { waypointId } = req.params
  try {
    const searchWaypoint = await prisma.waypoint.findFirst({ where: { id: +waypointId, user_id: id } })
    if (searchWaypoint == null) return res.status(404).json(errorJson('Waypoint not found'))
    return next()
  } catch (error) {
    serverErrorsHandler(error, req, res)
  }
}
