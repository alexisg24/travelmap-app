import { Router } from 'express'
const placesRouter = Router()

placesRouter.get('/', (_req, res) => {
  res.send('User Router!')
})

export { placesRouter }
