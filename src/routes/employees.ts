import { Router } from 'express';
import { pool } from '../utils/db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const result = await pool.request().query(
      `SELECT MECHANIC_NUMBER AS EMP_ID, MECHANIC_NAME, EMPLOYEE_TYPE, CERTIFICATE_NUMBER
       FROM MECHANIC`
    );
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

export default router;
