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
 * @returns {Promise<DBDishInList[]>}
 * */
export async function getDishesOfRestaurant(restaurantId) {
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
                 WHERE restaurantId = ?
               ) AS d
               LEFT JOIN dish_dishOption d_do
               ON d.id = d_do.dishId
               LEFT JOIN dishOption do
               ON d_do.dishOptionId = do.id
               GROUP BY d.id`;
  return (await pool.query(sql, [restaurantId]))[0];
}
