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
   





    
    

  
  
  
  
