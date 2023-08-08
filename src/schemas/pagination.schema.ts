import { coerce, object } from 'zod'

export const paginationSchema = object({
  query: object({
    page: coerce.number({ invalid_type_error: 'Page must be a number greater than 0' }).positive().default(1).optional(),
    limit: coerce.number({ invalid_type_error: 'Limit must be a number greater than 0' }).positive().default(1).optional()
  })
})
