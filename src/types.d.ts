export interface UserSchema {
  id: number
  email: string
  name: string
  lastname: string
  password: string
  username: string
}
export type JwtPayload = Pick<UserSchema, 'id' | 'username'>

declare global {
  namespace Express {
    export interface Request {
      authUser?: JwtPayload
      checkUser?: UserSchema | null
    }
  }
}
