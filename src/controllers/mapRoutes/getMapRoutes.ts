import { Request, Response } from 'express'
import { serverErrorsHandler } from '../../middlewares'
import { prisma } from '../../db/prismaInstance'
import { GetMapRoutesArray } from '../../types'
import { paginateInfo } from '../../helpers/paginateInfo'
import { errorJson } from '../../helpers/errorJson'

export const getUserMapRoutes = async (req: Request, res: Response): Promise<Response> => {
  if (req.authUser == null) return res.status(400).json(errorJson('User not found'))
  const { id } = req.authUser
  try {
    if (res.paginatedValues == null) throw new Error('Paginated values not found')
    const { page, limit, startIndex } = res.paginatedValues

    const getRoutesQuery = prisma.route.findMany({
      skip: startIndex,
      take: limit,
      select: {
        id: true,
        title: true,
        waypoint1: { select: { cords: true } },
        waypoint2: { select: { cords: true } }
      },
      where: { user_id: id },
      orderBy: {
        title: 'desc'
      }
    })

    const [userRoutes, countAllRoutes] = await prisma.$transaction([
      getRoutesQuery,
      prisma.route.count({ where: { user_id: id } })
    ])

    const maxPages = Math.floor(countAllRoutes / limit)
    const pagination = paginateInfo({
      resultArrayLength: userRoutes.length,
      startIndex,
      page,
      limit,
      maxPages
    })

    const results: GetMapRoutesArray = { results: userRoutes, ...pagination, maxPages }
    return res.status(200).json({ ok: true, ...results })
  } catch (error) {
    return serverErrorsHandler(error, req, res)
  }
}
