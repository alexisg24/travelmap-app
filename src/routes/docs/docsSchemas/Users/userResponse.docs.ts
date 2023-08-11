export const LoginResponse = {
  type: 'object',
  required: ['ok', 'accessToken'],
  properties: {
    ok: { type: 'boolean', example: true },
    accessToken: { type: 'string', example: '<KEY>' }
  }
}
