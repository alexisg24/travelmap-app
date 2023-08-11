export const PlacesSchema = {
  type: 'object',
  required: ['title', 'cords'],
  properties: {
    title: {
      type: 'string'
    },
    comment: {
      type: 'string'
    },
    cords: {
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
  }
}
