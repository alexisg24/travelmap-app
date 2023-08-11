/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { validateJWTMiddleware } from '../../middlewares'
import { createWaypoint, deleteWaypoint, updateWaypoint } from '../../controllers/waypoints'
import { validateZod } from '../../middlewares/validateSchemas'
import { paramsWaypointSchema, waypointSchema } from '../../schemas'
import { checkIfWaypointNotExist } from '../../middlewares/waypointMiddlewares'

const waypointsRouter = Router()

waypointsRouter.post('/',
  validateZod(waypointSchema),
  validateJWTMiddleware,
  createWaypoint)

waypointsRouter.delete('/:waypointId',
  validateZod(paramsWaypointSchema),
  validateJWTMiddleware, checkIfWaypointNotExist,
  deleteWaypoint)

waypointsRouter.put('/:waypointId',
  validateZod(paramsWaypointSchema), validateZod(waypointSchema),
  validateJWTMiddleware, checkIfWaypointNotExist,
  updateWaypoint)

export { waypointsRouter }

/**
 * @openapi
 * /api/v1/waypoints:
 *   post:
 *     tags:
 *       - Waypoints
 *     description: Create a new Waypoint.
*     parameters:
 *     - name: x-access-token
 *       in: header
 *       description: User Auth Token
 *       required: true
 *       type: string
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/WaypointSchema'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/WayPointResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 */

/**
 * @openapi
 * /api/v1/waypoints/{waypointId}:
 *   put:
 *     tags:
 *       - Waypoints
 *     description: Edit an existing Waypoint.
 *     parameters:
 *     - name: waypointId
 *       in: path
 *       description: WaypointId
 *       required: true
 *       type: number
 *     - name: x-access-token
 *       in: header
 *       description: User Auth Token
 *       required: true
 *       type: string
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/WaypointSchema'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/WayPointResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 */

/**
 * @openapi
 * /api/v1/waypoints/{waypointId}:
 *   delete:
 *     tags:
 *       - Waypoints
 *     description: Delete an existing Waypoint.
 *     parameters:
 *     - name: waypointId
 *       in: path
 *       description: WaypointId
 *       required: true
 *       type: number
 *     - name: x-access-token
 *       in: header
 *       description: User Auth Token
 *       required: true
 *       type: string
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/WayPointResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 */
