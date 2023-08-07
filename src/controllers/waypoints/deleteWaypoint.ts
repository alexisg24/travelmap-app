import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { serverErrorsHandler } from '../../middlewares'

const prisma = new PrismaClient()

export const deleteWaypoint = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json({ message: 'User not found' })
  const { id } = req.authUser
  const { waypointId } = req.params
  try {
    const deleteWaypoint = await prisma.waypoint.delete({
      where: {
        user_id: id,
        id: Number(waypointId)
      }
    })
    return res.status(201).json({ ok: true, waypoint: deleteWaypoint })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
