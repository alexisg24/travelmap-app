import { object, number, string } from 'zod'

export const waypointSchema = object({
  body: object({
    lat: number({
      required_error: 'Latitude is required',
      invalid_type_error: 'Latitude must be a number'
    }).safe(),
    lng: number({
      required_error: 'Longitude is required',
      invalid_type_error: 'Longitude must be a number'
    }).safe()
  })
})

export const deleteWaypointSchema = object({
  params: object({
    waypointId: string({
      required_error: 'WaypointId is required',
      invalid_type_error: 'WaypointId must be a valid id'
    }).regex(/^[1-9]\d*$/, { message: 'WaypointId must be a valid integer number' })
  })
})
