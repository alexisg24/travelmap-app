/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { validateZod } from '../../middlewares/validateSchemas'
import { paginationSchema, paramPlaceSchema, placeSchema } from '../../schemas'
import { createPlace, deletePlace, updatePlace, getUserPlaces } from '../../controllers/places'
import { paginationMiddleware, validateJWTMiddleware, checkIfPlaceExists, checkIfPlaceNotExist } from '../../middlewares'

const placesRouter = Router()

placesRouter.post('/',
  validateZod(placeSchema),
  validateJWTMiddleware, checkIfPlaceExists,
  createPlace
)
placesRouter.delete('/:placeId',
  validateZod(paramPlaceSchema),
  validateJWTMiddleware, checkIfPlaceNotExist,
  deletePlace
)

placesRouter.put('/:placeId',
  validateZod(paramPlaceSchema), validateZod(placeSchema),
  validateJWTMiddleware, checkIfPlaceNotExist,
  updatePlace
)

placesRouter.get('/',
  validateZod(paginationSchema),
  validateJWTMiddleware, paginationMiddleware,
  getUserPlaces)

export { placesRouter }

/**
 * @openapi
 * /api/v1/places:
 *   get:
 *     tags:
 *       - Places
 *     description: Get all user places.
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
 *              $ref: '#/components/schemas/GetPlacesResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 *   post:
 *     tags:
 *       - Places
 *     description: Create a new place.
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
 *                $ref: '#/components/schemas/PlacesSchema'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/PlacesResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 *
 * /api/v1/places/{placeId}:
 *   put:
 *     tags:
 *       - Places
 *     description: Edit an existing place.
 *     parameters:
 *     - name: placeId
 *       in: path
 *       description: PlaceId
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
 *                $ref: '#/components/schemas/PlacesSchema'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/PlacesResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 *   delete:
 *     tags:
 *       - Places
 *     description: Delete an existing place.
 *     parameters:
 *     - name: placeId
 *       in: path
 *       description: PlaceId
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
 *              $ref: '#/components/schemas/PlacesResponse'
 *       400-500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchema'
 */
