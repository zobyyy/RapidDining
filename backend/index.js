import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { pool } from './model/util.js';

/*************************
  * global config
  ***********************/

import 'dotenv/config';

/** @type {cors.CorsOptions} */
const corsOptions = {
  "origin": process.env.frontendAddr,
  "methods": "GET,PUT,POST,DELETE",
  "allowedHeaders": ["Content-Type"]
};

const port = 3000;

/*************************
  * global setup
  ***********************/

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

// try to connect to database
while (1) {
  try {
    await pool.query('SELECT 1+1 AS result');
    console.log('connected to database');
    break;
  } catch (err) {
    console.warn("Can't connect to mysql. Try again in 3 seconds.");
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

/*************************
  * routers
  ***********************/

app.all('/', function (req, res) {
  res.send("Hello friend from the other side!");
})

app.listen(port, () => {
  console.log(`Canchu backend listening on port:${port}`);
})
