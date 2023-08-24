import { pool } from './util.js';


export async function cancelReservation(phone, restaurantId) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await pool.query('SELECT id FROM Reservation WHERE phone = ? AND restaurantId = ?', [phone,restaurantId]);
    if (rows.length > 0) {
      const reservationId = rows[0].id;

      const [orderRows] = await connection.query('SELECT * FROM OrderList WHERE reservationId = ?', [reservationId]);
      if (orderRows.length > 0) {
        await connection.query('DELETE FROM OrderList WHERE reservationId = ?', [reservationId]);
      }
      await connection.query('DELETE FROM Reservation WHERE id = ?', [reservationId]);
      await connection.commit(); 
      return reservationId; 
    }

    await connection.commit(); 
    return null; 

  } catch (error) {
    await connection.rollback(); 
    console.error('Error in searchTableAndUpdate:', error);
    throw error;
  } finally {
    connection.release(); 
  }
}



export async function searchTableAndUpdate(phone, restaurantId) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [rows] = await connection.query('SELECT id FROM tableList WHERE phone = ? AND restaurantId = ?', [phone, restaurantId]);
      if (rows.length > 0) {
        const tableId = rows[0].id;

        const [orderRows] = await connection.query('SELECT * FROM OrderList WHERE tableId = ?', [tableId]);
        if (orderRows.length > 0) {
          await connection.query('DELETE FROM OrderList WHERE tableId = ?', [tableId]);
        }
        await connection.query('UPDATE tableList SET vacancy = true, phone = null WHERE id = ?', [tableId]);
        await connection.commit(); 
        return tableId; 
      }

      await connection.commit(); 
      return null; 

    } catch (error) {
      await connection.rollback(); 
      console.error('Error in searchTableAndUpdate:', error);
      throw error;
    } finally {
      connection.release(); 
    }
  }
   


export async function cancelTable(phone, restaurantId) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const [tableRows] = await connection.query('SELECT id, headcount FROM tableList WHERE phone = ? AND restaurantId = ?', [phone, restaurantId]);

    if (tableRows.length > 0) {
      const tableId = tableRows[0].id;
      const tableHeadcount = tableRows[0].headcount;
      console.log(tableId);
      const [orderRows] = await connection.query('SELECT id FROM OrderList WHERE restaurantId = ? AND tableId = ?', [restaurantId, tableId]);

      if (orderRows.length > 0) {
        const orderId = orderRows[0].id;
        await connection.query('DELETE FROM OrderList WHERE id = ?', [orderId]);
      }
      const [reservationRows] = await connection.query('SELECT id, phone FROM Reservation WHERE headcount <= ? AND restaurantId = ? LIMIT 1', [tableHeadcount, restaurantId]);
      console.log('tableheadcount',tableHeadcount)
     
      console.log('res id',reservationRows[0].id)
      console.log('res phone',reservationRows[0].phone)
      if (reservationRows.length > 0) {
        const reservationId = reservationRows[0].id;
        const reservationPhone = reservationRows[0].phone;

        await connection.query('UPDATE tableList SET phone = ? WHERE id = ?', [reservationPhone, tableId]);

        const [reservationOrderRows] = await connection.query('SELECT id FROM OrderList WHERE reservationId = ?', [reservationId]);

        if (reservationOrderRows.length > 0) {
          await connection.query('UPDATE OrderList SET reservationId = null, tableId = ? WHERE reservationId = ?', [tableId, reservationId]);
        } 
        await connection.query('DELETE FROM Reservation WHERE id = ?', [reservationId]);
      } else {
        await connection.query('UPDATE tableList SET phone = null, vacancy = true WHERE id = ?', [tableId]);
      }
      
      await connection.commit();
      return tableId;
    }
    await connection.commit();
    return null;
  } catch (error) {
    await connection.rollback();
    console.error('Error in cancelReservation:', error);
    throw error;
  } finally {
    connection.release();
  }
}

