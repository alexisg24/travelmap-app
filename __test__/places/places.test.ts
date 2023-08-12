import request from 'supertest'
import server from '../../src'

const BASE_URL = '/api/v1'

describe('Tests in /places', () => {
  test('request should fail when user sent wrong body or headers', async () => {
    const response = await request(server).get(`${BASE_URL}/places`)
    expect(response.status).toBe(401)
    expect(JSON.parse(response.text)).toMatchObject({
      ok: false,
      message: expect.arrayContaining([
        expect.objectContaining({ error: expect.any(String) })
      ])
    })
  })

  test('should return all places', async () => {
    const login = await request(server).post(`${BASE_URL}/users/login`).send({ email: 'test2@mail.com', password: '123456' })
    const { accessToken } = JSON.parse(login.text)
    const token = accessToken

    const response = await request(server).get(`${BASE_URL}/places?page=2&limit=1`).set('x-access-token', token)
    expect(response.status).toBe(200)

    expect(JSON.parse(response.text)).toMatchObject({
      ok: true,
      results: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          comment: expect.any(String),
          waypoint: expect.objectContaining({ cords: expect.any(String) })
        })
      ]),
      previous: expect.objectContaining({
        page: expect.any(Number),
        limit: expect.any(Number)
      }),
      next: expect.objectContaining({
        page: expect.any(Number),
        limit: expect.any(Number)
      }),
      maxPages: expect.any(Number)
    })
  })
})
