
export const User = {
  type: 'object',
  required: ['name', 'lastname', 'email', 'password'],
  properties: {
    name: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    username: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  }
}

export const AuthenticationUser = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  }
}
