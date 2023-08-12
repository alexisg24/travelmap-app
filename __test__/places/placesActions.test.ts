/* eslint-disable @typescript-eslint/restrict-template-expressions */
import request from 'supertest'
import server from '../../src'

const BASE_URL = '/api/v1'

describe('Post, put and delete in /places', () => {
  test('test should create, edit and delete a place', async () => {
    const login = await request(server).post(`${BASE_URL}/users/login`).send({ email: 'test@mail.com', password: '123456' })
    const { accessToken } = JSON.parse(login.text)
    const token = accessToken

    const response1 = await request(server)
      .post(`${BASE_URL}/places`)
      .set('x-access-token', token)
      .send({ title: 'Example', cords: { lat: 150, lng: 150 } })

    expect(response1.status).toBe(201)
    expect(JSON.parse(response1.text)).toMatchObject({
      ok: true,
      place: expect.objectContaining({ id: expect.any(Number), waypoint: expect.objectContaining({ cords: expect.any(String) }) })
    })

    const { place } = JSON.parse(response1.text)
    const response2 = await request(server)
      .put(`${BASE_URL}/places/${place.id}`)
      .set('x-access-token', token)
      .send({ title: 'Example', cords: { lat: 102, lng: 102 } })
    expect(response2.status).toBe(201)
    expect(JSON.parse(response2.text)).toMatchObject({
      ok: true,
      place: expect.objectContaining({ id: expect.any(Number), waypoint: expect.objectContaining({ cords: expect.any(String) }) })
    })

    const response3 = await request(server)
      .delete(`${BASE_URL}/places/${place.id}`)
      .set('x-access-token', token)
    expect(response3.status).toBe(201)
    expect(JSON.parse(response3.text)).toMatchObject({
      ok: true,
      place: expect.objectContaining({ id: expect.any(Number), waypoint: expect.objectContaining({ cords: expect.any(String) }) })
    })
  })
})
