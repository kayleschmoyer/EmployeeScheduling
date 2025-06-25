import { Router } from 'express';
import { pool } from '../utils/db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const result = await pool.request().query(
      `SELECT * FROM TIME_OFF_REQUESTS`
    );
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch time off requests' });
  }
});

router.post('/', async (req, res) => {
  const { EMP_ID, START_TIME, END_TIME, NOTES } = req.body;
  try {
    const result = await pool.request()
      .input('EMP_ID', EMP_ID)
      .input('START_TIME', START_TIME)
      .input('END_TIME', END_TIME)
      .input('NOTES', NOTES)
      .query(
        `INSERT INTO TIME_OFF_REQUESTS (EMP_ID, START_TIME, END_TIME, NOTES)
         OUTPUT INSERTED.*
         VALUES (@EMP_ID, @START_TIME, @END_TIME, @NOTES)`
      );
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create time off request' });
  }
});

export default router;
