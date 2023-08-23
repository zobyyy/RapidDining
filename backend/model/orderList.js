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
      console.log(`removed takeout order ${id}`);
      await conn.commit();
      return;
    }
    const releasedTable = (await conn.query(`SELECT headcount,restaurantId FROM tableList WHERE id = ? FOR UPDATE`, [existOrder.tableId]))[0][0];
    const recentReservant = (await conn.query(`SELECT id,phone FROM Reservation WHERE restaurantId = ? AND headcount <= ? LIMIT 1 FOR UPDATE`, [releasedTable.restaurantId, releasedTable.headcount]))[0][0];
    if(recentReservant === undefined){
      await conn.query(`UPDATE tableList SET phone=NULL WHERE id=?`, [existOrder.tableId]);
      console.log(`removed internal order ${id} and released table ${existOrder.tableId} of restaurant ${releasedTable.restaurantId} and there's no more reservants`);
      await conn.commit();
      return;
    }
    await conn.query(`UPDATE tableList SET phone=? WHERE id=?`, [recentReservant.phone, existOrder.tableId]);
    await conn.query(`DELETE FROM Reservation WHERE id = ?`, [recentReservant.id]);
    console.log(`removed internal order ${id} and table ${existOrder.tableId} is now seat of reservation ${releasedTable.restaurantId}`);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
