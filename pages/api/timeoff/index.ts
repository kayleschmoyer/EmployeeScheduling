import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDb } from '../../../lib/db'
import { withAuth } from '../../../lib/auth'

const getRequests = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pool = await connectDb()
    const result = await pool.request().query('SELECT * FROM TIME_OFF_REQUESTS')
    res.status(200).json(result.recordset)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch time off requests' })
  }
}

const createRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { empId, startDate, endDate, reason } = req.body
  if (!empId || !startDate || !endDate) {
    res.status(400).json({ message: 'Missing required fields' })
    return
  }
  try {
    const pool = await connectDb()
    const result = await pool.request()
      .input('EMP_ID', empId)
      .input('START_DATE', startDate)
      .input('END_DATE', endDate)
      .input('REASON', reason ?? null)
      .query(
        `INSERT INTO TIME_OFF_REQUESTS (EMP_ID, START_DATE, END_DATE, REASON)
         OUTPUT INSERTED.*
         VALUES (@EMP_ID, @START_DATE, @END_DATE, @REASON)`
      )
    res.status(201).json(result.recordset[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to submit request' })
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') return createRequest(req, res)
  return getRequests(req, res)
}

export default withAuth(handler)
