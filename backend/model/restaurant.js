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
 * @returns {Promise<DBRestaurantInfo[]>}
 * */
export async function selectAllRestaurantSortedByTime(headCount) {
  const sql = `SELECT
                 r.id AS id,
                 r.name AS name,
                 r.phone AS phone,
                 r.address AS address,
                 d.waitTime AS waitTime,
                 v.vacancy AS availability,
                 r.picture AS picture
               FROM (
                 SELECT
                   id,
                   name,
                   phone,
                   address,
                   picture
                 FROM restaurant
               ) r
               LEFT JOIN (
                 SELECT
                   ol.restaurantId,
                   SUM(dish.time * od.quantity) AS waitTime
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
               ) v ON r.id = v.restaurantId
               ORDER BY d.waitTime ASC` // TODO: remove after redis built
  return (await pool.query(sql, [headCount]))[0];
}

/**
  * @typedef {object} DBRestaurantProfile
  * @property {number} id
  * @property {string} name
  * @property {string} phone
  * @property {string} address
  * @property {string} picture
  * @property {string} description
  * @property {null | string} banner
  * */

/**
 * @param {number} restaurantId
 * @returns {Promise<undefined | DBRestaurantProfile>}
 * */
export async function restaurantProfile(restaurantId) {
  const sql = `SELECT
                 id,
                 name,
                 phone,
                 address,
                 picture,
                 description,
                 banner
               FROM restaurant
               WHERE id = ?`;
  return (await pool.query(sql, [restaurantId]))[0][0];
}
