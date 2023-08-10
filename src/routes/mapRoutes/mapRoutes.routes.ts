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
