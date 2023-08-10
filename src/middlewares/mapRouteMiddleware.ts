/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { NextFunction, Request, Response } from 'express'
import { MapRoutesRequestPayload } from '../types'
import { formatCords } from '../helpers/formatCords'
import { prisma } from '../db/prismaInstance'
import { serverErrorsHandler } from './serverErrorsHandler'

export const checkIfRouteExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (req.authUser == null) return res.status(400).json({ message: 'User not found' })
  const { id } = req.authUser
  const { cords1, cords2 } = (req.body as MapRoutesRequestPayload)
  try {
    const [formattedCords1, formattedCords2] = [formatCords(cords1.lat, cords1.lng), formatCords(cords2.lat, cords2.lng)]
    const findRoute = await prisma.route.findFirst({
      include: {
        waypoint1: {
          select: {
            id: true,
            cords: true
          }
        },
        waypoint2: {
          select: {
            id: true,
            cords: true
          }
        }
      },
      where: {
        user_id: {
          equals: id
        },
        waypoint1: {
          cords: formattedCords1
        },
        waypoint2: {
          cords: formattedCords2
        }
      }
    })
    if (findRoute == null) return next()
    return res.status(400).json({ ok: false, message: 'Route is already registered' })
  } catch (error) {
    serverErrorsHandler(error, req, res)
  }
}

export const checkIfRouteNotExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (req.authUser == null) return res.status(400).json({ message: 'User not found' })
  const { id } = req.authUser
  const { mapRouteID } = req.params
  try {
    const findRoute = await prisma.route.findFirst({ where: { user_id: id, id: +mapRouteID } })
    if (findRoute == null) return res.status(404).json({ ok: false, message: 'Route not found' })
    return next()
  } catch (error) {
    serverErrorsHandler(error, req, res)
  }
}
