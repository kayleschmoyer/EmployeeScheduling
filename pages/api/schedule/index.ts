import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDb } from '../../../lib/db'
import { withAuth } from '../../../lib/auth'
import { Shift } from '../../../models/Shift'

const getShifts = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pool = await connectDb()
    const result = await pool.request().query(
      `SELECT s.ID, s.EMP_ID, s.SHOP_ID, s.START_TIME, s.END_TIME, s.CREATED_BY, s.NOTES, e.NAME AS EMP_NAME
       FROM SCHEDULE s
       JOIN EMPLOYEE e ON s.EMP_ID = e.EMP_ID`
    )
    const shifts: Shift[] = result.recordset.map((row: any) => ({
      id: row.ID,
      empId: row.EMP_ID,
      shopId: row.SHOP_ID,
      startTime: row.START_TIME,
      endTime: row.END_TIME,
      createdBy: row.CREATED_BY,
      notes: row.NOTES,
      empName: row.EMP_NAME,
    }))
    res.status(200).json(shifts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch schedule' })
  }
}

const createShift = async (req: NextApiRequest, res: NextApiResponse) => {
  const { empId, shopId, startTime, endTime, createdBy, notes } = req.body as Partial<Shift>
  if (!empId || !shopId || !startTime || !endTime) {
    res.status(400).json({ message: 'Missing required fields' })
    return
  }
  try {
    const pool = await connectDb()
    const result = await pool.request()
      .input('EMP_ID', empId)
      .input('SHOP_ID', shopId)
      .input('START_TIME', startTime)
      .input('END_TIME', endTime)
      .input('CREATED_BY', createdBy ?? null)
      .input('NOTES', notes ?? null)
      .query(
        `INSERT INTO SCHEDULE (EMP_ID, SHOP_ID, START_TIME, END_TIME, CREATED_BY, NOTES)
         OUTPUT INSERTED.*
         VALUES (@EMP_ID, @SHOP_ID, @START_TIME, @END_TIME, @CREATED_BY, @NOTES)`
      )
    const row = result.recordset[0]
    const shift: Shift = {
      id: row.ID,
      empId: row.EMP_ID,
      shopId: row.SHOP_ID,
      startTime: row.START_TIME,
      endTime: row.END_TIME,
      createdBy: row.CREATED_BY,
      notes: row.NOTES,
    }
    res.status(201).json(shift)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to create shift' })
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return withAuth(createShift, 'Manager')(req, res)
  }
  return withAuth(getShifts)(req, res)
}

export default handler
