/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { validateJWTMiddleware } from '../../middlewares'
import { createWaypoint, deleteWaypoint } from '../../controllers/waypoints'
import { validateZod } from '../../middlewares/validateSchemas'
import { deleteWaypointSchema, waypointSchema } from '../../schemas'

const waypointsRouter = Router()

waypointsRouter.post('/', validateZod(waypointSchema), validateJWTMiddleware, createWaypoint)
waypointsRouter.delete('/:waypointId', validateZod(deleteWaypointSchema), validateJWTMiddleware, deleteWaypoint)

export { waypointsRouter }
