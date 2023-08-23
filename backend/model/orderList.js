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
        return (await conn.query(`SELECT reservationId,tableId FROM OrderList WHERE id = ? FOR UPDATE`, [id]))[0][0];
      else
        return (await conn.query(`SELECT reservationId,tableId FROM OrderList WHERE id = ? AND phone = ? FOR UPDATE`, [id, phone]))[0][0];
    }();
    if(existOrder === undefined){
      throw new TargetNotFound();
    }
    if(existOrder.reservationId !== null){
      throw new TargetNotEligible();
    }
    /**@type {import("mysql2").ResultSetHeader}*/
    const orderDelResult = (await conn.query("DELETE FROM OrderList WHERE id=?", [id]))[0];
    if (orderDelResult.affectedRows !== 1) {
      console.error(`trying to remove ${orderDelResult.affectedRows} records when removing order ${id}!`);
      throw new BadOrderRemoval();
    }
    if(existOrder.tableId === null){
      await conn.commit();
      return;
    }
    const releasedHeadcount = (await conn.query(`SELECT headcount FROM tableList WHERE id = ?`, [existOrder.tableId]))[0][0]["headcount"];
    const recentReservant = (await conn.query(`SELECT phone FROM Reservation WHERE headcount <= ? LIMIT 1`, [releasedHeadcount]))[0][0];
    if(recentReservant === undefined){
      await conn.commit();
      return;
    }
    await conn.query(`UPDATE tableList SET phone=? WHERE id=?`, [recentReservant.phone, existOrder.tableId]);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
