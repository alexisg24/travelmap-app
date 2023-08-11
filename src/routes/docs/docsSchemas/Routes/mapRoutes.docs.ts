export const MapRouteSchema = {
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
