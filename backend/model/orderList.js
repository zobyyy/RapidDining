import { pool } from "./util.js";

export class BadOrderRemoval extends Error { }
export class TargetNotEligible extends BadOrderRemoval { }
export class TargetNotFound extends BadOrderRemoval { }

/**
 * @param {number} id
 * @param {undefined | number} phone
 * @throws {TargetNotEligible} If the order doesn't meet the condition to be removed
 * @throws {TargetNotFound} If the specified order can't be found
 * @throws {BadOrderRemoval} Trying to remove more than one rows (unlikely!)
 * */
export async function deleteOrder(id, phone) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const existOrder = await async function () {
      if(phone === undefined)
        return (await conn.query(`SELECT reservationId FROM OrderList WHERE id = ? FOR UPDATE`, [id]))[0][0];
      else
        return (await conn.query(`SELECT reservationId FROM OrderList WHERE id = ? AND phone = ? FOR UPDATE`, [id, phone]))[0][0];
    }();
    if(existOrder === undefined){
      throw new TargetNotFound();
    }
    if(existOrder.reservationId !== null){
      throw new TargetNotEligible();
    }
    /**@type {import("mysql2").ResultSetHeader}*/
    const result = (await conn.query("DELETE FROM OrderList WHERE id=?", [id]))[0];
    if (result.affectedRows === 1) {
      await conn.commit();
    } else {
      console.error(`trying to remove ${result.affectedRows} records when removing order ${id}!`);
      throw new BadOrderRemoval();
    }
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
