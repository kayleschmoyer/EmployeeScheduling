import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { NextApiRequest, NextApiResponse } from 'next'

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  })
}

export const verifyFirebaseToken = async (token: string) => {
  return await getAuth().verifyIdToken(token)
}

export const withAuth = (handler: (req: NextApiRequest, res: NextApiResponse, decodedToken: any) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    try {
      const idToken = authHeader.split(' ')[1]
      const decodedToken = await verifyFirebaseToken(idToken)
      await handler(req, res, decodedToken)
    } catch (err) {
      console.error('Auth error:', err)
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
