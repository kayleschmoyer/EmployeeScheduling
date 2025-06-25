import { config, ConnectionPool } from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: config = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_DATABASE as string,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const pool = new ConnectionPool(dbConfig);

pool.connect().catch(err => {
  console.error('Failed to connect to SQL Server:', err);
});
