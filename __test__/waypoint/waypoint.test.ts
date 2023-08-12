import request from 'supertest'
import server from '../../src'
import { WaypointSchema } from '../../src/types'
import { formatCords } from '../../src/helpers/formatCords'

const BASE_URL = '/api/v1'

describe('Tests in /waypoints', () => {
  test('request should fail when user sent wrong body or headers', async () => {
    const response = await request(server).post(`${BASE_URL}/waypoints`)
    expect(response.status).toBe(400)
    expect(JSON.parse(response.text)).toMatchObject({
      ok: false,
      message: expect.arrayContaining([
        expect.objectContaining({ error: expect.any(String), path: expect.any(String) })
      ])
    })
  })

  test('should create, edit and delete a waypoint', async () => {
    const login = await request(server).post(`${BASE_URL}/users/login`).send({ email: 'test@mail.com', password: '123456' })
    const { accessToken } = JSON.parse(login.text)
    const token = accessToken

    const response1 = await request(server)
      .post(`${BASE_URL}/waypoints`)
      .set('x-access-token', token)
      .send({ lat: 100, lng: 100 })
    expect(response1.status).toBe(201)
    expect(JSON.parse(response1.text)).toMatchObject({
      ok: true,
      waypoint: expect.objectContaining({
        id: expect.any(Number),
        user_id: expect.any(Number),
        cords: expect.any(String)
      })
    })

    const waypoint = (JSON.parse(response1.text).waypoint) as WaypointSchema
    const data = { lat: 102, lng: 102 }
    const parsedCords = formatCords(`${data.lat}`, `${data.lng}`)
    const response2 = await request(server)
      .put(`${BASE_URL}/waypoints/${waypoint.id}`)
      .set('x-access-token', token)
      .send(data)
    expect(response2.status).toBe(201)
    expect(JSON.parse(response2.text)).toMatchObject({
      ok: true,
      waypoint: expect.objectContaining({
        id: expect.any(Number),
        user_id: expect.any(Number),
        cords: parsedCords
      })
    })

    const response3 = await request(server)
      .delete(`${BASE_URL}/waypoints/${waypoint.id}`)
      .set('x-access-token', token)
    expect(response3.status).toBe(201)
    expect(JSON.parse(response3.text)).toMatchObject({
      ok: true,
      waypoint: expect.objectContaining({
        id: expect.any(Number),
        user_id: expect.any(Number),
        cords: expect.any(String)
      })
    })
  })
})
