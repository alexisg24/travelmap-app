import bcryptjs from 'bcryptjs'
export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcryptjs.genSalt()
    return await bcryptjs.hash(password, salt)
  } catch (error) {
    throw new Error('Error while encrypting password')
  }
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await bcryptjs.compare(password, hash)
  } catch (error) {
    throw new Error('Error while comparing password')
  }
}
