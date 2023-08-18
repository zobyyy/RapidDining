import { pool } from './util.js';
import '../util/types.js';

/**
 * @typedef {object} DBRestaurantInfo
 * @property {number} id
 * @property {string} name
 * @property {string} phone
 * @property {string} address
 * @property {(number | null)} waitTime
 * @property {(1 | null)} availability
 * @property {string} picture
 * */

/**
 * @param {number} headCount
 * @param {number} smallestId
 * @returns {Promise<DBRestaurantInfo[]>}
 * */
export async function selectAllRestaurantSortedByTime(headCount, smallestId) {
  const sql = `WITH r AS (
                 SELECT
                   id,
                   name,
                   phone,
                   address,
                   picture
                 FROM restaurant
                 WHERE id >= ?
                 LIMIT 6
               )
               SELECT
                 r.id AS id,
                 r.name AS name,
                 r.phone AS phone,
                 r.address AS address,
                 d.waitTime AS waitTime,
                 v.vacancy AS availability,
                 r.picture AS picture
               FROM r
               LEFT JOIN (
                 SELECT
                   ol.restaurantId,
                   SUM(dish.time) AS waitTime
                 FROM OrderList ol
                 LEFT JOIN OrderDish od
                 ON ol.id = od.orderId
                 LEFT JOIN dish
                 ON od.dishId = dish.id
                 GROUP BY ol.restaurantId
               ) d ON r.id = d.restaurantId
               LEFT JOIN (
                 SELECT
                   restaurantId,
                   MAX(vacancy) AS vacancy
                 FROM tableList
                 WHERE vacancy = TRUE AND headcount >= ?
                 GROUP BY restaurantId
               ) v ON r.id = v.restaurantId` // TODO: remove after redis built
  return (await pool.query(sql, [smallestId, headCount]))[0];
}
