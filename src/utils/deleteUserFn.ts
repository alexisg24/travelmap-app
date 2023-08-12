import { prisma } from '../db/prismaInstance'
interface User {
  id: number
  email: string
  name: string
  lastname: string
  password: string
  username: string
}
export const deleteUserFn = async (username: string): Promise<User> => {
  try {
    const user = await prisma.user.delete({ where: { username } })
    return user
  } catch (error) {
    throw new Error('Failed to delete user')
  }
}
