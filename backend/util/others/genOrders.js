import supertest from "supertest";
import "dotenv/config";
import { pool } from "../../model/util.js";
import { app } from "../../index.js";
import { expect } from "chai";


const conn = await pool.getConnection();
await conn.beginTransaction();
try {
  await conn.query('DELETE FROM OrderList');
  await conn.query('DELETE FROM Reservation');
  await conn.query('UPDATE tableList SET vacancy=TRUE, phone=NULL');
  await conn.commit();
} catch (error) {
  console.error(error);
  await conn.rollback();
} finally {
  conn.release();
}

const ap = supertest(app);
for(const [restaurantId, dishId] of [[2, 17], [3, 18], [4, 19], [9, 20], [10, 21], [11, 22]]){
  const nDish = 4 + Math.floor(Math.random() * 3); // [4, 7) dishes
  const response = await ap
    .post(`/api/${process.env.apiVer}/orders/request`)
    .send({
      restaurantId,
      total: 100 * nDish,
      phone: '09' + Math.floor(Math.random() * 99999999).toString().padStart(8, '0'),
      items: [{
        dishId,
        customized: [],
        quantity: nDish
      }]
    });
  expect(response.statusCode).equal(200);
  expect(response.body.data.orders.id).an('number');
  console.log(`ordered ${nDish} dish on restaurant ${restaurantId} as orderId ${response.body.data.orders.id}`);
}
// order 1 dish on restaurant 1
const response = await ap
  .post(`/api/${process.env.apiVer}/orders/request`)
  .send({
    restaurantId: 1,
    total: 75,
    phone: '09' + Math.floor(Math.random() * 99999999).toString().padStart(8, '0'),
    items: [{
      dishId: 4,
      customized: [],
      quantity: 1
    }]
});
expect(response.statusCode).equal(200);
expect(response.body.data.orders.id).an('number');
console.log(`ordered 1 dish on restaurant 1 as orderId ${response.body.data.orders.id}`);
await pool.end();
