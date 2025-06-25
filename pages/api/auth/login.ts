import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDb } from '../../../lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }
  const { username, password } = req.body as { username?: string; password?: string }
  if (!username || !password) {
    res.status(400).json({ message: 'Missing credentials' })
    return
  }
  try {
    const pool = await connectDb()
    const result = await pool.request().input('USERNAME', username).query(
      `SELECT EMPLOYEE_NUMBER, EMPLOYEE_NAME, USERNAME, PASSWORD_HASH, ROLE FROM MECHANIC WHERE USERNAME = @USERNAME AND ACTIVE = 1`
    )
    const user = result.recordset[0]
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })
    const match = await bcrypt.compare(password, user.PASSWORD_HASH)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign(
      { userId: user.EMPLOYEE_NUMBER, username: user.USERNAME, role: user.ROLE },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    )
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 8}`)
    res.status(200).json({ token })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
