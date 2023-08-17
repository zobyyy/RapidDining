import { pool } from "./util.js";

/**
 * @typedef {object} DBDishInList
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 * @property {(null | string)} picture
 * @property {string} type
 * @property {(0 | 1)} isVegan
 * @property {(0 | 1)} canBeSpicy
 * */

/**
 * @param {number} restaurantId
 * @param {number} minDishId
 * @returns {Promise<DBDishInList[]>}
 * */
export async function getDishesOfRestaurant(restaurantId, minDishId) {
  const sql = `SELECT
                 d.*,
                 CASE
                   WHEN EXISTS (
                     SELECT 1
                     FROM dish_dishOption d_do
                     WHERE d.id = d_do.dishId
                       AND d_do.id BETWEEN 2 AND 5
                   ) THEN TRUE
                   ELSE FALSE
                 END AS canBeSpicy
               FROM (
                 SELECT
                   id,
                   name,
                   price,
                   description,
                   picture,
                   type,
                   isVegan
                 FROM dish
                 WHERE restaurantId = ? AND id >= ?
                 LIMIT 11
               ) AS d
               LEFT JOIN dish_dishOption d_do
               ON d.id = d_do.dishId
               LEFT JOIN dishOption do
               ON d_do.dishOptionId = do.id
               GROUP BY d.id`;
  return (await pool.query(sql, [restaurantId, minDishId]))[0];
}

/**
  * @param {number} restaurantId
  * @param {string} type
  * @returns {Promise<null | number>}
  * */
export async function getMinDishIdInTypeOfRestaurant(restaurantId, type) {
  const sql = `SELECT MIN(id) AS id
               FROM dish
               WHERE restaurantId = ? AND type = ?`;
  return (await pool.query(sql, [restaurantId, type]))[0][0].id;
}
