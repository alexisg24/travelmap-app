import { prisma } from '../db/prismaInstance'
import { formatCords } from '../helpers/formatCords'
import { WaypointSchema } from '../types'

export const updateWaypointFn = async (userId: number, id: number, lat: string, lng: string): Promise<WaypointSchema> => {
  try {
    const updatedWaypoint = await prisma.waypoint.update({
      data: {
        user_id: userId,
        cords: formatCords(lat, lng)
      },
      where: {
        id
      }
    })
    return updatedWaypoint
  } catch (error) {
    console.log(error)

    throw new Error('Error while creating waypoint')
  }
}
