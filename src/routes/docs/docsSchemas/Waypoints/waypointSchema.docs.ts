export const WaypointSchema = {
  type: 'object',
  required: ['lat', 'lng'],
  properties: {
    lat: {
      type: 'number'
    },
    lng: {
      type: 'number'
    }
  }
}
