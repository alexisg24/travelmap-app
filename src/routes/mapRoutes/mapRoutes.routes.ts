import { Router } from 'express'
const mapRoutes = Router()

mapRoutes.get('/', (_req, res) => {
  res.send('User Router!')
})

export { mapRoutes }
