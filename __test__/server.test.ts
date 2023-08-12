import request from 'supertest'
import server from '../src'

const BASE_URL = '/api/v1'

describe('Test on server', () => {
  test('should return 404 status code if the endpoint does not exist', async () => {
    const response = await request(server).get(`${BASE_URL}/testingendpoint`)
    expect(response.statusCode).toBe(404)
    expect(JSON.parse(response.text)).toEqual({
      ok: false,
      message: [{ error: expect.any(String) }]
    })
  })

  test('should return 301 status code if the user access to /docs endpoint', async () => {
    const response = await request(server).get(`${BASE_URL}/docs`)
    expect(response.statusCode).toBe(301)
  })
})
