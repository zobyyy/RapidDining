import mysql from "mysql2/promise"
import 'dotenv/config';

export const pool = mysql.createPool({
  "host": process.env.dbAddr,
  "user": process.env.dbUser,
  "password": process.env.dbPasswd,
  "database": process.env.dbDatabase
});
