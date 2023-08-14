export const LoginResponse = {
  type: 'object',
  required: ['ok', 'accessToken'],
  properties: {
    ok: { type: 'boolean', example: true },
    accessToken: { type: 'string', example: '<KEY>' },
    username: { type: 'string', example: 'Johndoe123' }
  }
}

export const TokenResponse = {
  type: 'object',
  required: ['ok', 'accessToken'],
  properties: {
    ok: { type: 'boolean', example: true },
    accessToken: { type: 'string', example: '<KEY>' }
  }
}
