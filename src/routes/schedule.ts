import { Router } from 'express';
import { pool } from '../utils/db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.request().query(
      `SELECT s.ID, m.MECHANIC_NAME AS EMP_NAME, s.START_TIME, s.END_TIME, s.NOTES
       FROM SCHEDULE s
       JOIN MECHANIC m ON s.EMP_ID = m.MECHANIC_NUMBER`
    );
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

router.post('/', async (req, res) => {
  const { EMP_ID, START_TIME, END_TIME, CREATED_BY, NOTES } = req.body;
  try {
    const result = await pool.request()
      .input('EMP_ID', EMP_ID)
      .input('START_TIME', START_TIME)
      .input('END_TIME', END_TIME)
      .input('CREATED_BY', CREATED_BY)
      .input('NOTES', NOTES)
      .query(
        `INSERT INTO SCHEDULE (EMP_ID, START_TIME, END_TIME, CREATED_BY, NOTES)
         OUTPUT INSERTED.*
         VALUES (@EMP_ID, @START_TIME, @END_TIME, @CREATED_BY, @NOTES)`
      );
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create schedule' });
  }
});

export default router;
