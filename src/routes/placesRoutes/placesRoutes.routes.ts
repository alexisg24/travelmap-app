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

placesRouter.get('/', validateZod(paginationSchema), validateJWTMiddleware, paginationMiddleware, getUserPlaces)

export { placesRouter }
