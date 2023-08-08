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

export interface WaypointPayload {
  lat: string
  lng: string
}

export interface WaypointSchema {
  id: number
  user_id: number
  cords: string
}

export interface PlaceRequestPayload {
  title: string
  comment?: string
  cords: WaypointPayload
}
