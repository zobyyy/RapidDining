import { pool } from './util.js';


export async function checkExistingTable(phone) {
    try {
      const [rows] = await pool.query('SELECT * FROM tableList WHERE phone = ?', [phone]);
      console.log('Query result:', rows);
      return rows.length > 0;
    } catch (error) {
      console.error('Error in checkTable:', error);
      throw error; 
    }
  }

  export async function checkExistingReservation(phone) {
    try {
      const [rows] = await pool.query('SELECT * FROM Reservation WHERE phone = ?', [phone]);
      console.log('checkExistingReservation result:', rows);
      return rows.length > 0;
    } catch (error) {
      console.error('Error in checkExistingReservation:', error);
      throw error; 
    }
  }


export async function hasVacancy(restaurantId, headcount) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM tableList WHERE restaurantId = ? AND headcount >= ? AND vacancy = true',
      [restaurantId, headcount]
    );
    console.log(`result of return ${rows.length}`);
    return rows.length > 0;
  } catch (error) {
    console.error('Error in checkVacancy:', error);
    throw error; 
  }
}

export async function updateTableVacancy(phone,headcount) {
  try {
    const [results] = await pool.query(`SELECT id FROM tableList WHERE vacancy = true AND headcount >= ? ORDER BY id LIMIT 1`, [headcount]
        );
        console.log(`results is ${results}`);
        const tableid = results[0].id; 
        console.log(`give you a id = ${tableid}`);
        await pool.query(`UPDATE tableList SET vacancy = false, phone = ? WHERE id = ?`, [phone, tableid]);
        return tableid;
  } catch (error) {
    console.error('Error in updateTableVacancy:', error);
    throw error; 
  }
}

export async function insertReservation(phone, headcount, restaurantId) {
  try {
    const [result] = await pool.query('INSERT INTO Reservation (phone, headcount, restaurantId) VALUES (?, ?, ?)', [
      phone,
      headcount,
      restaurantId
    ]);
    console.log(`inser into reservationId ${result.insertId}`);
    return result.insertId;
  } catch (error) {
    console.error('Error in insertReservation:', error);
    throw error; 
  }
}

export async function getWaitCount(restaurantId) {
    try {
      const results = await pool.query('SELECT * FROM Reservation WHERE restaurantId = ?', [restaurantId]);
      console.log('the result of res count:', results[0].length);
      return results[0].length;
    } catch (error) {
      console.error('Error in getWaitCount:', error);
      throw error; 
    }
  }
