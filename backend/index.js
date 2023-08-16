import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import './util/types';
import { pool } from './model/util.js';

import { restaurantList } from './controller/restaurant/list';
import { reservationReserve } from './controller/reservation/reserve';
import { reservationPending } from './controller/reservation/pending';
import { reservationCancel } from './controller/reservation/cancel';
import { restaurantVacancy } from './controller/restaurant/vacancy';
import { menuSearch } from './controller/menu/search';
import { dishDetail } from './controller/menu/detail';
import { orderRequest } from './controller/order/request';
import { orderPending } from './controller/order/pending';

/*************************
  * global config
*************************/

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
*************************/

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
*************************/

app.all('/', function (req, res) {
  res.send({ "data": "Hello friend from the other side!" });
})

app.get(`/api/${process.env.apiVer}/restaurants`, restaurantList);
app.post(`/api/${process.env.apiVer}/reservations/reserve`, reservationReserve);
app.get(`/api/${process.env.apiVer}/reservations/pending`, reservationPending);
app.delete(`/api/${process.env.apiVer}/reservations/cancel`, reservationCancel);
app.get(`/api/${process.env.apiVer}/restaurants/:restaurantId/vacancy`, restaurantVacancy);
app.get(`/api/${process.env.apiVer}/menus/search`, menuSearch);
app.get(`/api/${process.env.apiVer}/menus/:dishId`, dishDetail);
app.post(`/api/${process.env.apiVer}/orders/request`, orderRequest);
app.get(`/api/${process.env.apiVer}/orders/pending`, orderPending);

app.listen(port, () => {
  console.log(`Canchu backend listening on port:${port}`);
})
