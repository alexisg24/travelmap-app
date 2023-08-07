import { Router } from 'express'
import { userRouter } from './usersRoutes/user.routes'
import { placesRouter } from './placesRoutes/placesRoutes.routes'
import { mapRoutes } from './mapRoutes/mapRoutes.routes'
import { waypointsRouter } from './waypointRoutes/waypoints.routes'
// import apicache from 'apicache'
// const cache = apicache.middleware
const router = Router()

router.use('/users', userRouter)
router.use('/places', placesRouter)
router.use('/maproutes', mapRoutes)
router.use('/waypoints', waypointsRouter)

export { router }
