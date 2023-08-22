import { pool } from './util.js';
import moment from 'moment-timezone';

export async function getOrderSummary(restaurantId) {
try {
     const query = `
     SELECT * FROM OrderList
     WHERE restaurantId = ?
     ORDER BY id ASC;
   `;

   const [orderList] = await pool.query(query, [restaurantId]);

   const orderSummary = orderList.map(order => ({
    orderId: order.id,
    ReservationId: order.reservationId || null,
    tableId: order.tableId || null,
    total: order.total,
    created_at:moment(order.created_at).format('HH:mm'),
    status: (() => {
      if (order.reservationId === null && order.tableId !== null) {
        return '內用';
      } else if (order.reservationId !== null && order.tableId === null) {
        return '候位';
      } else {
        return '外帶';
      }
    })()
  }));
  return orderSummary;
} catch (error) {
  console.error('Error in getOrderSummary:', error);
  throw error;
}
}