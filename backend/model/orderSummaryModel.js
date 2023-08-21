import { pool } from './util.js';
import moment from 'moment-timezone';
moment.tz.setDefault("Asia/Taipei");

async function mapPostResults(results) {
    if (results.length === 0) {
      return { data: { orderSummary: [], next_cursor: null } };
    }
  
    const lastRecordId = results[results.length - 1].id;
    console.log('lastrecordid',lastRecordId);
    
    const orderSummary = results.map((resultRow) => ({
      orderId: resultRow.id,
      ReservationId: resultRow.reservationId,
      tableId: resultRow.tableId,
      total: resultRow.total,
      created_at: moment(resultRow.created_at).format('YYYY-MM-DD HH:mm:ss'),
    }));
  
    const nextCursor = results.length === 6 ? lastRecordId : null;
    console.log('resultlength',results.length);
    console.log('last record id',lastRecordId);
    const encodedCursor = nextCursor !== null ? btoa(nextCursor.toString()) : null;
    console.log(`original nextCursor : ${nextCursor}`);
    console.log(`encodedCursor : ${encodedCursor}`);
    return { data: { orderSummary, next_cursor: encodedCursor } };
  }

async function decodeCursor(encodedCursor) {
    if (!encodedCursor) {
      return null;
    }
  
    try {
      const decodedCursor = parseInt(atob(encodedCursor), 10);
      return decodedCursor;
    } catch (error) {
      console.error('Error decoding cursor:', error);
      return null;
    }
  }

export async function getInOrderSummary(restaurantId,encodedCursor) {
    let cursor = null;
    if (encodedCursor !== undefined ) {
        cursor = await decodeCursor(encodedCursor);
      }
      console.log('is undefined');
      console.log('cursor is ', cursor);

  try {
       const query = `
       SELECT * FROM OrderList
       WHERE (reservationId IS NOT NULL OR tableId IS NOT NULL)
       AND restaurantId = ?
       ${cursor ? "AND id < ?" : ""} 
       ORDER BY id DESC
       LIMIT 6;  
     `;
     const [orderList] = await pool.query(query, [restaurantId,cursor]);
 
     return mapPostResults(orderList);
     //   const orderSummary = orderList.map(order => ({
     //     orderId: order.id,
     //     ReservationId: order.reservationId,
     //     tableId: order.tableId,
     //     price: order.total,
     //     total: order.total,
     //     created_at: order.created_at
     //   }));
   
     //   return orderSummary;
  } catch (error) {
    console.error('Error in getInOrderSummary:', error);
    throw error;
  }
}


export async function getOutOrderSummary(restaurantId,encodedCursor) {
  let cursor = null;
  if (encodedCursor !== undefined ) {
      cursor = await decodeCursor(encodedCursor);
    }
    console.log('is undefined');
    console.log('cursor is ', cursor);

try {
     const query = `
     SELECT * FROM OrderList
     WHERE (reservationId IS NULL AND tableId IS NULL)
     AND restaurantId = ?
     ${cursor ? "AND id < ?" : ""} 
     ORDER BY id DESC
     LIMIT 6;  
   `;
   const [orderList] = await pool.query(query, [restaurantId,cursor]);

   return mapPostResults(orderList);
   //   const orderSummary = orderList.map(order => ({
   //     orderId: order.id,
   //     ReservationId: order.reservationId,
   //     tableId: order.tableId,
   //     price: order.total,
   //     total: order.total,
   //     created_at: order.created_at
   //   }));
 
   //   return orderSummary;
} catch (error) {
  console.error('Error in getOutOrderSummary:', error);
  throw error;
}
}
