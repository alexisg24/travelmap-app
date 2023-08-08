import { prisma } from '../db/prismaInstance'
import { WaypointSchema } from '../types'

export const deleteWaypointFn = async (userID: number, waypointId: number): Promise<WaypointSchema> => {
  try {
    const deleteWaypoint = await prisma.waypoint.delete({
      where: {
        user_id: userID,
        id: +waypointId
      }
    })
    return deleteWaypoint
  } catch (error) {
    console.log(error)

    throw new Error('Error deleting waypoint')
  }
}
