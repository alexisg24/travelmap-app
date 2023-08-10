import { prisma } from '../db/prismaInstance'
import { formatCords } from '../helpers/formatCords'
import { WaypointSchema } from '../types'

export const createWaypointFn = async (userID: number, lat: string, lng: string): Promise<WaypointSchema> => {
  try {
    const newWaypoint = await prisma.waypoint.create({
      data: {
        user_id: userID,
        cords: formatCords(lat, lng)
      }
    })
    return newWaypoint
  } catch (error) {
    throw new Error('Error while creating waypoint')
  }
}
