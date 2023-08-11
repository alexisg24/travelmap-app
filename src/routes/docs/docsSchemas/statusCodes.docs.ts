export const ErrorSchema = {
  description: 'FAILED',
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/ErrorSchema'
      }
    }
  }
}
