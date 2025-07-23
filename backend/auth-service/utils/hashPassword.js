import bcrypt from 'bcryptjs'

export const hashpassword = async (password) => {
    const saltRounds = 8
    return await bcrypt.hash(password, saltRounds)
}
