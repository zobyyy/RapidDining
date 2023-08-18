import { pool } from './util.js';

export async function searchReservation(phone,restaurantId) {
  try {
    const [rows] = await pool.query('SELECT * FROM Reservation WHERE phone = ? AND restaurantId = ?', [phone,restaurantId]);
    if (rows.length > 0) {
        return rows[0].id;
      } else {
        return null;
      }
  } catch (error) {
    console.error('Error in searchReservation:', error);
    throw error;
  }
}

export async function cancelReservation(id) {
  try {
    await pool.query('DELETE FROM Reservation WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in cancelReservation:', error);
    throw error;
  }
}

export async function searchTable(phone , restaurantId) {
  try {
    const [rows] = await pool.query('SELECT id FROM tableList WHERE phone = ? AND restaurantId = ?', [phone,restaurantId]);
    if (rows.length > 0) {
      return rows[0].id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error in searchTable:', error);
    throw error;
  }
}

export async function updateTable(id) {
    try {
      await pool.query('UPDATE tableList SET vacancy = true, phone = null WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error in cancelTable:', error);
      throw error;
    }
  }

  
  
  
  
