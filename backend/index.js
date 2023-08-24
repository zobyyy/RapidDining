import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import './util/types.js';
import { pool } from './model/util.js';

import { restaurantList } from './controller/restaurant/list.js';
import { restaurantProfile } from './controller/restaurant/profile.js';
import { reservationReserve } from './controller/reservation/reserve.js';
import { reservationStatus } from './controller/reservation/status.js';
import { tableStatus } from './controller/reservation/tableStatus.js';
import { changeOrderStatus } from './controller/reservation/orderToIn.js';
import { reservationCancel } from './controller/reservation/reserveCancel.js';
import { restaurantVacancy } from './controller/restaurant/vacancy.js';
import { menuSearch } from './controller/menu/search.js';
import { dishDetail } from './controller/menu/detail.js';
import { orderRequest } from './controller/order/request.js';
import { orderPending } from './controller/order/pending.js';
import { OrderSummary } from './controller/order/order.js';
import { orderDetail } from './controller/order/detail.js';
import { tableCancel } from './controller/reservation/tableCancel.js';
import { orderCheckout } from './controller/order/checkout.js';
import { orderCancel } from './controller/order/cancel.js';







/*************************
  * global config
*************************/

import 'dotenv/config';

/** @type {cors.CorsOptions} */
const corsOptions = {
  // "origin": process.env.frontendAddr,
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
while (1) {  // eslint-disable-line no-constant-condition
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
app.use(`/pic`, express.static('pic'));

app.get(`/api/${process.env.apiVer}/restaurants`, restaurantList);
app.get(`/api/${process.env.apiVer}/restaurants/:id/profile`, restaurantProfile);
app.post(`/api/${process.env.apiVer}/reservations/reserve`, reservationReserve);
app.get(`/api/${process.env.apiVer}/reservations/status`, reservationStatus);
app.get(`/api/${process.env.apiVer}/reservations/tablestatus`, tableStatus);
app.delete(`/api/${process.env.apiVer}/reservations/cancel`, reservationCancel);
app.delete(`/api/${process.env.apiVer}/tables/cancel`, tableCancel);
app.get(`/api/${process.env.apiVer}/restaurants/:restaurantId/vacancy`, restaurantVacancy);
app.get(`/api/${process.env.apiVer}/menus/search`, menuSearch);
app.get(`/api/${process.env.apiVer}/menus/:dishId`, dishDetail);
app.post(`/api/${process.env.apiVer}/orders/request`, orderRequest);
app.get(`/api/${process.env.apiVer}/orders/pending`, orderPending);
app.get(`/api/${process.env.apiVer}/orders/detail`, orderDetail);
app.get(`/api/${process.env.apiVer}/orders/order`, OrderSummary);
app.post(`/api/${process.env.apiVer}/reservations/orderstatus`, changeOrderStatus);









app.post(`/api/${process.env.apiVer}/orders/:orderId/checkout`, orderCheckout);
app.delete(`/api/${process.env.apiVer}/orders/:orderId/cancel`, orderCancel);

app.listen(port, () => {
  console.log(`Rapid dining backend listening on port:${port}`);
})

export { app };
