import { object, string } from 'zod'

export const registerSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string'
    })
      .nonempty()
      .trim()
      .min(3, { message: 'Must be 3 or more characters long' })
      .max(30, { message: 'Must be 30 or fewer characters long' })
      .regex(/^[a-zA-Z]+$/, { message: 'Must only contain letters' }),

    lastname: string({
      required_error: 'Lastname is required'
    })
      .nonempty()
      .trim()
      .min(3, { message: 'Must be 3 or more characters long' })
      .max(30, { message: 'Must be 30 or fewer characters long' })
      .regex(/^[a-zA-Z]+$/, { message: 'Must only contain letters' }),

    username: string({
      required_error: 'username is required'
    })
      .nonempty()
      .trim()
      .toLowerCase()
      .min(3, { message: 'Must be 3 or more characters long' })
      .max(30, { message: 'Must be 30 or fewer characters long' })
      .regex(/^[a-zA-Z0-9]+$/, { message: 'Must only contain letters and numbers' }),

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
