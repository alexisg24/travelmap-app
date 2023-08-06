import { Router } from 'express'
const userRouter = Router()

userRouter.get('/', (_req, res) => {
  res.send('User Router!')
})

export { userRouter }
