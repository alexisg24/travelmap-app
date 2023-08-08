/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { validateJWTMiddleware } from '../../middlewares'
import { validateZod } from '../../middlewares/validateSchemas'
import { paramPlaceSchema, placeSchema } from '../../schemas'
import { createPlace, deletePlace } from '../../controllers/places'
import { checkIfPlaceExists, checkIfPlaceNotExist } from '../../middlewares/placeMiddlewares'
import { updatePlace } from '../../controllers/places/updatePlace'

const placesRouter = Router()

placesRouter.post('/', validateZod(placeSchema), validateJWTMiddleware, checkIfPlaceExists, createPlace)
placesRouter.delete('/:placeId', validateZod(paramPlaceSchema), validateJWTMiddleware, checkIfPlaceNotExist, deletePlace)
placesRouter.put('/:placeId', validateZod(paramPlaceSchema), validateZod(placeSchema), validateJWTMiddleware, checkIfPlaceNotExist, updatePlace)

export { placesRouter }
