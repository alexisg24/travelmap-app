import { mapRouteSchema } from './schemas/mapRoutes.schema'
export interface UserSchema {
  id: number
  email: string
  name: string
  lastname: string
  password: string
  username: string
}
export type JwtPayload = Pick<UserSchema, 'id' | 'username'>

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

export interface MapRoutesRequestPayload {
  title: string
  cords1: WaypointPayload
  cords2: WaypointPayload
}

export interface Pagination {
  page: number
  limit: number
}

export interface GetPlacesArray {
  results: PlaceSchema[]
  next?: Pagination
  previous?: Pagination
  maxPages: number
}

export interface GetMapRoutesArray {
  results: mapRouteSchema[]
  next?: Pagination
  previous?: Pagination
  maxPages: number
}

export interface PaginationRequest extends Pagination {
  startIndex: number
}

declare global {
  namespace Express {
    export interface Request {
      authUser?: JwtPayload
      checkUser?: UserSchema | null
    }
    export interface Response {
      paginatedValues?: PaginationRequest
    }
  }
}
