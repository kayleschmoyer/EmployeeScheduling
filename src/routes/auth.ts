import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const loginHandler = (req: Request, res: Response): void => {
  const { username, role } = req.body;
  if (!username || !role) {
    res.status(400).json({ error: 'Invalid credentials' });
    return;
  }
  const token = jwt.sign({ username, role }, process.env.JWT_SECRET as string, {
    expiresIn: '8h',
  });
  res.json({ token });
};

router.post('/login', loginHandler);

export default router;
