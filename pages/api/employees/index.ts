import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDb } from '../../../lib/db'
import { withAuth } from '../../../lib/auth'
import { Employee } from '../../../models/Employee'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pool = await connectDb()
    const result = await pool.request().query(
      `SELECT EMPLOYEE_NUMBER AS EMP_ID, EMPLOYEE_NAME AS NAME, ROLE, ACTIVE FROM MECHANIC WHERE ACTIVE = 1`
    )
    const employees: Employee[] = result.recordset.map((row: any) => ({
      empId: row.EMP_ID,
      name: row.NAME,
      role: row.ROLE,
      active: row.ACTIVE === 1,
    }))
    res.status(200).json(employees)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch employees' })
  }
}

export default withAuth(handler)
