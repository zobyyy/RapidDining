

import { pool } from './util.js';

export async function getPendingOrders(phone) {
  try {
    console.log(`the phone to be search is ${phone}`);

    const tableQuery = `
  SELECT id FROM tableList
   WHERE phone = ?;
 `;
    const [tableResult] = await pool.query(tableQuery, [phone]);
    console.log(`search result =${tableResult}`);
    const tableId = tableResult[0]?.id;
    console.log(`search tableId = ${tableResult[0]?.id}`);

    
    const reservationQuery = `
    SELECT id, restaurantId FROM Reservation
    WHERE phone = ?;
 `;
    const [reservationResult] = await pool.query(reservationQuery, [phone]);
    const reservationId = reservationResult[0]?.id;
    const restaurantId = reservationResult[0]?.restaurantId;
    console.log(`you have a reservation on res ${reservationResult[0]?.restaurantId}`);


    const orderQuery = `
   SELECT id FROM OrderList
   WHERE phone = ?;
 `;
    const [orderResult] = await pool.query(orderQuery, [phone]);
    const orderId = orderResult[0]?.id;

    let reservationCount = null;

    //status
    if(restaurantId ){
    const reservationCountQuery = `
      SELECT COUNT(*) AS count FROM Reservation
      WHERE restaurantId = ? AND id < ?;
    `;

    const [reservationCountResult] = await pool.query(reservationCountQuery, [restaurantId,reservationId]);
    reservationCount = reservationCountResult[0]?.count + 1 ;
    console.log(`you are the num ${reservationCount}`);
    }

    return {
      tableId: tableId || null,
      reservationId: reservationId || null,
      orderId: orderId || null,
      status: reservationCount || null,
    };
  } catch (error) {
    console.error('Error in insertReservation:', error);
    throw error;
  }
}