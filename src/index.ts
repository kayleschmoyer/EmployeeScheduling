import express from 'express';
import dotenv from 'dotenv';
import scheduleRouter from './routes/schedule';
import authRouter from './routes/auth';
import employeesRouter from './routes/employees';
import timeoffRouter from './routes/timeoff';

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

app.use('/api/schedule', scheduleRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/timeoff', timeoffRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
