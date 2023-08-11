export const ErrorSchema = {
  type: 'object',
  required: ['message', 'ok'],
  properties: {
    ok: {
      type: 'boolean'
    },
    message: {
      type: 'array',
      items: {
        type: 'object',
        required: ['error'],
        properties: {
          error: {
            type: 'string'
          },
          path: {
            type: 'string'
          }
        }
      }
    }
  }
}
