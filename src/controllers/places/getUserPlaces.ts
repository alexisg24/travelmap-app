import { Request, Response } from 'express'
import { serverErrorsHandler } from '../../middlewares'
import { prisma } from '../../db/prismaInstance'
import { GetPlacesArray } from '../../types'
import { paginateInfo } from '../../helpers/paginateInfo'

export const getUserPlaces = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json({ message: 'User not found' })
  const { id } = req.authUser
  try {
    if (res.paginatedValues == null) throw new Error('Paginated values not found')
    const { page, limit, startIndex } = res.paginatedValues

    const getPlacesQuery = prisma.place.findMany({
      skip: startIndex,
      take: limit,
      select: {
        id: true,
        title: true,
        comment: true,
        waypoint: { select: { cords: true } }
      },
      where: { user_id: id },
      orderBy: {
        title: 'desc'
      }
    })

    const [userPlaces, countAllPlaces] = await prisma.$transaction([
      getPlacesQuery,
      prisma.place.count({ where: { user_id: id } })
    ])
    const maxPages = Math.floor(countAllPlaces / limit)
    const pagination = paginateInfo({
      resultArrayLength: userPlaces.length,
      startIndex,
      page,
      limit,
      maxPages
    })

    const results: GetPlacesArray = { results: userPlaces, ...pagination, maxPages }
    return res.status(200).json({ ok: true, results })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
