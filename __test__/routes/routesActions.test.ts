/* eslint-disable @typescript-eslint/restrict-template-expressions */
import request from 'supertest'
import server from '../../src'

const BASE_URL = '/api/v1'

describe('Post, put and delete in /maproutes', () => {
  test('test should create, edit and delete a route', async () => {
    const login = await request(server).post(`${BASE_URL}/users/login`).send({ email: 'test@mail.com', password: '123456' })
    const { accessToken } = JSON.parse(login.text)
    const token = accessToken

    const response1 = await request(server)
      .post(`${BASE_URL}/maproutes`)
      .set('x-access-token', token)
      .send({ title: 'Example', cords1: { lat: 150, lng: 150 }, cords2: { lat: 180, lng: 190 } })

    expect(response1.status).toBe(201)
    expect(JSON.parse(response1.text)).toMatchObject({
      ok: true,
      route: expect.objectContaining({
        id: expect.any(Number),
        waypoint1: expect.objectContaining({ cords: expect.any(String) }),
        waypoint2: expect.objectContaining({ cords: expect.any(String) })
      })
    })

    const { route } = JSON.parse(response1.text)
    const response2 = await request(server)
      .put(`${BASE_URL}/maproutes/${route.id}`)
      .set('x-access-token', token)
      .send({ title: 'Example2', cords1: { lat: 170, lng: 170 }, cords2: { lat: 180, lng: 190 } })
    expect(response2.status).toBe(201)
    expect(JSON.parse(response2.text)).toMatchObject({
      ok: true,
      route: expect.objectContaining({
        id: expect.any(Number),
        waypoint1: expect.objectContaining({ cords: expect.any(String) }),
        waypoint2: expect.objectContaining({ cords: expect.any(String) })
      })
    })

    const response3 = await request(server)
      .delete(`${BASE_URL}/maproutes/${route.id}`)
      .set('x-access-token', token)
    expect(response3.status).toBe(201)
    expect(JSON.parse(response3.text)).toMatchObject({
      ok: true,
      route: expect.objectContaining({
        id: expect.any(Number),
        waypoint1: expect.objectContaining({ cords: expect.any(String) }),
        waypoint2: expect.objectContaining({ cords: expect.any(String) })
      })
    })
  })
})
