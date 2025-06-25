import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export interface Session {
  userId: number
  username: string
  role: string
}

export const verifyToken = (token: string): Session => {
  return jwt.verify(token, JWT_SECRET) as Session
}

export const withAuth = (
  handler: NextApiHandler,
  role?: string
) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authHeader = req.headers.authorization
    const token = req.cookies.token || authHeader?.startsWith('Bearer ')
      ? authHeader?.split(' ')[1]
      : undefined
    if (!token) throw new Error('No token')
    const session = verifyToken(token)
    if (role && session.role !== role) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    ;(req as any).session = session
    return await (handler as any)(req, res)
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
