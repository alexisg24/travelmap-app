import { Pagination } from '../types'

type PaginateInfo = (
  { resultArrayLength, startIndex, page, limit, maxPages }:
  { resultArrayLength: number, startIndex: number, page: number, limit: number, maxPages: number }) => PaginationResult

interface PaginationResult {
  next?: Pagination
  previous?: Pagination
}
export const paginateInfo: PaginateInfo = ({ resultArrayLength, startIndex, page, limit, maxPages }) => {
  const res: PaginationResult = {}
  if (resultArrayLength >= limit && page < maxPages) res.next = { page: page + 1, limit }
  if (startIndex > 0) res.previous = { page: page - 1, limit }
  return res
}
