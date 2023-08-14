import request from 'supertest'
import server from '../../src'

const BASE_URL = '/api/v1/users'

describe('Test in /login', () => {
  test('should login successfully', async () => {
    const response = await request(server)
      .post(`${BASE_URL}/login`)
      .send({
        email: 'test@mail.com',
        password: '123456'
      })
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toMatchObject({
      ok: true,
      accessToken: expect.any(String),
      username: expect.any(String)
    })
  })

  test('request should fail when recive empty body', async () => {
    const response = await request(server).post(`${BASE_URL}/login`)
    expect(response.status).toBe(400)
    expect(JSON.parse(response.text)).toMatchObject({
      ok: false,
      message: expect.arrayContaining([
        expect.objectContaining({
          error: expect.any(String)
        })
      ])
    })
  })

  test('should not login with wrong password', async () => {
    const [response1, response2] = await Promise.all([
      request(server).post(`${BASE_URL}/login`).send({ email: 'wrong@mail.com', password: '123456' }),
      request(server).post(`${BASE_URL}/login`).send({ email: 'test@mail.com', password: '12345678' })
    ])

    expect(response1.status).toBe(400)
    expect(JSON.parse(response1.text)).toMatchObject({
      ok: false,
      message: expect.arrayContaining([
        expect.objectContaining({
          error: expect.any(String)
        })
      ])
    })

    expect(response2.status).toBe(400)
    expect(JSON.parse(response2.text)).toMatchObject({
      ok: false,
      message: expect.arrayContaining([
        expect.objectContaining({
          error: expect.any(String)
        })
      ])
    })
  })
})
