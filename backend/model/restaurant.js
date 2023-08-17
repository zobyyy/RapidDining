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
  const sql = `SELECT
                   r.id AS id,
                   r.name AS name,
                   r.phone AS phone,
                   r.address AS address,
                   SUM(d.dishTime) AS waitTime,
                   v.vacancy AS availability,
                   r.picture AS picture
               FROM restaurant r
               LEFT JOIN (
                   SELECT
                       ol.restaurantId,
                       SUM(d.time) AS dishTime
                   FROM (
                       SELECT DISTINCT restaurantId, dishId
                       FROM OrderList
                   ) ol
                   LEFT JOIN dish d on ol.dishId = d.id
                   GROUP BY ol.restaurantId, ol.dishId
               ) d ON r.id = d.restaurantId
               LEFT JOIN (
                   SELECT
                       restaurantId,
                       MAX(vacancy) AS vacancy
                   FROM tableList
                   WHERE vacancy = TRUE AND headcount >= ?
                   GROUP BY restaurantId
               ) v ON r.id = v.restaurantId
               WHERE r.id >= ?
               GROUP BY r.id
               LIMIT 11` // TODO: remove after redis built
  return (await pool.query(sql, [headCount, smallestId]))[0];
}
