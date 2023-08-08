/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { validateJWTMiddleware } from '../../middlewares'
import { createWaypoint, deleteWaypoint, updateWaypoint } from '../../controllers/waypoints'
import { validateZod } from '../../middlewares/validateSchemas'
import { paramsWaypointSchema, waypointSchema } from '../../schemas'
import { checkIfWaypointNotExist } from '../../middlewares/waypointMiddlewares'

const waypointsRouter = Router()

waypointsRouter.post('/', validateZod(waypointSchema), validateJWTMiddleware, createWaypoint)
waypointsRouter.delete('/:waypointId', validateZod(paramsWaypointSchema), validateJWTMiddleware, checkIfWaypointNotExist, deleteWaypoint)
waypointsRouter.put('/:waypointId', validateZod(paramsWaypointSchema), validateZod(waypointSchema), validateJWTMiddleware, checkIfWaypointNotExist, updateWaypoint)

export { waypointsRouter }
