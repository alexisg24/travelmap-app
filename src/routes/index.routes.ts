import { Router } from 'express'
import { userRouter } from './usersRoutes/user.routes'
import { placesRouter } from './placesRoutes/placesRoutes.routes'
import { mapRoutes } from './mapRoutes/mapRoutes.routes'
const router = Router()

router.use('/users', userRouter)
router.use('/places', placesRouter)
router.use('/maproutes', mapRoutes)

export { router }
