

import { pool } from './util.js';

export async function getPendingOrders(phone) {
  try {
    console.log(`the phone to be search is ${phone}`);
    
    const pendingOrders = [];

    const tableQuery = `
      SELECT t.id, t.restaurantId, r.name AS restaurantName, r.picture AS restaurantPicture
      FROM tableList t
      LEFT JOIN restaurant r ON t.restaurantId = r.id
      WHERE t.phone = ?;
    `;
    const [tableResult] = await pool.query(tableQuery, [phone]);
    if (tableResult.length > 0) {
      const tableInfo = tableResult[0];
      pendingOrders.push({
        tableId: tableInfo.id || null,
        reservationId: null,
        orderId: null,
        status: null,
        restaurantId: tableInfo.restaurantId || null,
        restaurantName: tableInfo.restaurantName || null,
        restaurantPic: tableInfo.restaurantPicture || null
      });
    }

    const reservationQuery = `
      SELECT r.id AS reservationId, r.restaurantId, res.name AS restaurantName, res.picture AS restaurantPicture
      FROM Reservation r
      LEFT JOIN restaurant res ON r.restaurantId = res.id
      WHERE r.phone = ?;
    `;
    const [reservationResult] = await pool.query(reservationQuery, [phone]);

    
    if (reservationResult.length > 0) {

      let reservationCount = null;
  
      const reservationInfo = reservationResult[0];
      
      const reservationCountQuery = `
      SELECT COUNT(*) AS count FROM Reservation
      WHERE restaurantId = ? AND id < ?;
    `;
    const [reservationCountResult] = await pool.query(reservationCountQuery, [reservationInfo.restaurantId
      , reservationInfo.reservationId]);
    reservationCount = reservationCountResult[0]?.count + 1;
    console.log(`you are the num ${reservationCount}`);

      pendingOrders.push({
        tableId: null,
        reservationId: reservationInfo.reservationId || null,
        orderId: null,
        status: reservationCount ,
        restaurantId: reservationInfo.restaurantId || null,
        restaurantName: reservationInfo.restaurantName || null,
        restaurantPic: reservationInfo.restaurantPicture || null
      });
    }

    const orderQuery = `
      SELECT o.id AS orderId, o.restaurantId, res.name AS restaurantName, res.picture AS restaurantPicture
      FROM OrderList o
      LEFT JOIN restaurant res ON o.restaurantId = res.id
      WHERE o.phone = ?;

    `;
    const [orderResult] = await pool.query(orderQuery, [phone]);
    if (orderResult.length > 0) {
      const orderInfo = orderResult[0];
      console.log('orderInfo result',orderResult[0]);
      console.log('orderInfo restaurant result',orderResult[0].restaurantId);
      pendingOrders.push({
        tableId: null,
        reservationId: null,
        orderId: orderInfo.orderId || null,
        status: null,
        restaurantId: orderInfo.restaurantId || null,
        restaurantName: orderInfo.restaurantName || null,
        restaurantPic: orderInfo.restaurantPicture || null
      });
    }

    return pendingOrders;
  } catch (error) {
    console.error('Error in getPendingOrders:', error);
    throw error;
  }
}
