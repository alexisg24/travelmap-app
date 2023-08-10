import { Request, Response } from 'express'
import { serverErrorsHandler } from '../../middlewares'
import { prisma } from '../../db/prismaInstance'
import { errorJson } from '../../helpers/errorJson'

export const deleteWaypoint = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json(errorJson('User not found'))
  const { id } = req.authUser
  const { waypointId } = req.params
  try {
    const deleteWaypoint = await prisma.waypoint.delete({
      where: {
        user_id: id,
        id: +waypointId
      }
    })
    return res.status(201).json({ ok: true, waypoint: deleteWaypoint })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
