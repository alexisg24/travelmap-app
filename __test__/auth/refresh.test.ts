import request from 'supertest'
import server from '../../src'

const BASE_URL = '/api/v1/users'

describe('Test in /refresh', () => {
  test('should fail the call when recive bad request or invalid/expired token', async () => {
    const response = await request(server).get(`${BASE_URL}/refresh`)
    expect(response.status).toBe(401)
    expect(JSON.parse(response.text)).toMatchObject({
      ok: false,
      message: expect.arrayContaining([
        expect.objectContaining({
          error: expect.any(String)
        })
      ])
    })
  })

  test('should login successfully', async () => {
    const loginResponse = await request(server)
      .post(`${BASE_URL}/login`)
      .send({
        email: 'test@mail.com',
        password: '123456'
      })
    const { accessToken } = JSON.parse(loginResponse.text)

    const response = await request(server).get(`${BASE_URL}/refresh`).set('x-access-token', accessToken)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toMatchObject({
      ok: true,
      accessToken: expect.any(String)
    })
  })
})
