import request from 'supertest'
import server from '../../src'
import { deleteUserFn } from '../../src/utils/deleteUserFn'
const BASE_URL = '/api/v1/users'

describe('Test in /register', () => {
  test('Should register a new user successfully', async () => {
    const userData = {
      name: 'Testing',
      lastname: 'User',
      username: 'testinguser123',
      email: 'thetestinguser123@gmail.com',
      password: '123456'
    }
    const response = await request(server)
      .post(`${BASE_URL}/register`)
      .send(userData)

    expect(response.status).toBe(201)
    expect(JSON.parse(response.text)).toEqual({
      ok: true,
      accessToken: expect.any(String)
    })

    await deleteUserFn(userData.username)
  })

  test('Should not register a new user with an existing username or email', async () => {
    const userData = {
      name: 'Testing',
      lastname: 'User',
      username: 'johndoe',
      email: 'test@mail.com',
      password: '123456'
    }
    const response = await request(server)
      .post(`${BASE_URL}/register`)
      .send(userData)

    expect(response.status).toBe(400)
    expect(JSON.parse(response.text)).toEqual({
      ok: false,
      message: expect.arrayContaining([
        expect.objectContaining({
          error: expect.any(String)
        })
      ])
    })
  })

  test('Should not register a new user without body info', async () => {
    const response = await request(server)
      .post(`${BASE_URL}/register`)

    expect(response.status).toBe(400)
    expect(JSON.parse(response.text)).toEqual({
      ok: false,
      message: expect.arrayContaining([
        expect.objectContaining({
          error: expect.any(String),
          path: expect.any(String)
        })
      ])
    })
  })
})
