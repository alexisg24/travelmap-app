/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { checkIfRouteExists, checkIfRouteNotExists, paginationMiddleware, validateJWTMiddleware } from '../../middlewares'
import { createMapRoutes, deleteMapRoutes, getUserMapRoutes, updateMapRoutes } from '../../controllers/mapRoutes'
import { validateZod } from '../../middlewares/validateSchemas'
import { mapRouteSchema, paginationSchema, paramRoutesSchema } from '../../schemas'
const mapRoutes = Router()

mapRoutes.post('/',
  validateZod(mapRouteSchema),
  validateJWTMiddleware, checkIfRouteExists,
  createMapRoutes
)

mapRoutes.put('/:mapRouteID',
  validateZod(paramRoutesSchema), validateZod(mapRouteSchema),
  validateJWTMiddleware, checkIfRouteNotExists,
  updateMapRoutes
)

mapRoutes.delete('/:mapRouteID',
  validateZod(paramRoutesSchema),
  validateJWTMiddleware, checkIfRouteNotExists,
  deleteMapRoutes
)
mapRoutes.get('/', validateZod(paginationSchema), validateJWTMiddleware, paginationMiddleware, getUserMapRoutes)

export { mapRoutes }

/**
 * @openapi
 * /api/v1/maproutes:
 *   get:
 *     tags:
 *       - Map Routes
 *     description: Get all user map routes.
 *     parameters:
 *     - name: x-access-token
 *       in: header
 *       description: User Auth Token
 *       required: true
 *       type: string
 *     - name: page
 *       in: query
 *       description: Page number
 *       type: number
 *       default: 1
 *     - name: limit
 *       in: query
 *       description: Max response elements ammount number
 *       type: number
 *       default: 10
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/GetRoutesResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 *   post:
 *     tags:
 *       - Map Routes
 *     description: Create a new map route.
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
 *                $ref: '#/components/schemas/MapRouteSchema'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/MapRouteResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 *
 * /api/v1/maproutes/{mapRouteId}:
 *   put:
 *     tags:
 *       - Map Routes
 *     description: Edit an existing map route.
 *     parameters:
 *     - name: mapRouteId
 *       in: path
 *       description: MapRouteId
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
 *                $ref: '#/components/schemas/MapRouteSchema'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/MapRouteResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 *   delete:
 *     tags:
 *       - Map Routes
 *     description: Delete an existing place.
 *     parameters:
 *     - name: mapRouteId
 *       in: path
 *       description: MapRouteId
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
 *              $ref: '#/components/schemas/MapRouteResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 */
