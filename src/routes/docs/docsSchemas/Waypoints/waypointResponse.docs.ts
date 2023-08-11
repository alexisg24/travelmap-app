export const WayPointResponse = {
  type: 'object',
  required: ['ok', 'waypoint'],
  properties: {
    ok: { type: 'boolean', example: true },
    waypoint: {
      type: 'object',
      required: ['id', 'user_id', 'cords'],
      properties: {
        id: { type: 'number', example: 1 },
        user_id: { type: 'number', example: 1 },
        cords: { type: 'string', example: '(lat, lng)' }
      }
    }

  }
}
