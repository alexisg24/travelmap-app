import { object, string } from 'zod'

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'email is required'
    })
      .nonempty()
      .trim()
      .toLowerCase()
      .min(3, { message: 'Must be 3 or more characters long' })
      .max(50, { message: 'Must be 50 or fewer characters long' })
      .email(),
    password: string({
      required_error: 'password is required'
    })
      .nonempty()
      .min(6, { message: 'Must be 6 or more characters long' })
      .max(32, { message: 'Must be 32 or fewer characters long' })
  })
})
