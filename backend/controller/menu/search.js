import { base64url } from "jose";

import { getDishesOfRestaurant, getMinDishIdInTypeOfRestaurant } from "../../model/menu.js";
import { pictureForFrontend } from "../../util/util.js";

class Cursor {
  /**
    * @param {object} opt
    * @param {number} opt.dishId
    * */
  constructor({ dishId }) {
    this.dishId = dishId;
  }

  /**
    * @param {string} serialized
    * */
  static fromSerialized(serialized) {
    return new Cursor(JSON.parse(base64url.decode(serialized).toString()));
  }

  get serialized() { return base64url.encode(JSON.stringify(this)); }
}

/**
  * @param {import("../../model/menu.js").DBDishInList[]} dishInDB
  * */
function convertDishes(dishInDB) {
  /**@type {Record<string, APIDishObject[]> }*/
  const category_dish = {};
  dishInDB.map(dish => {
    const dishInAPI = {
      "id": dish.id,
      "name": dish.name,
      "price": dish.price,
      "description": dish.description,
      "picture": pictureForFrontend(dish.picture),
      "spicy": new Boolean(dish.canBeSpicy),
      "vegan": new Boolean(dish.isVegan)
    };
    if (category_dish[dish.type] === undefined) {
      category_dish[dish.type] = [dishInAPI];
    } else {
      category_dish[dish.type].push(dishInAPI);
    }
  });
  return category_dish;
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * */
export async function menuSearch(req, res, next) { // eslint-disable-line no-unused-vars
  const restaurantId = +req.query.restaurantId;
  if (Number.isNaN(restaurantId)) {
    return res.status(400).send({ "error": "invalid restaurantId" });
  }
  /**@type {undefined | Cursor}*/
  let cursor = undefined;
  if (req.query.cursor !== undefined) {
    try {
      cursor = Cursor.fromSerialized(req.query.cursor);
    } catch (err) {
      return res.status(400).send({ "error": "invalid cursor" });
    }
  }
  // with cursor
  if (cursor !== undefined) {
    try {
      const dishes = await getDishesOfRestaurant(restaurantId, cursor.dishId);
      return res.status(200).send({
        "data": {
          "menu": Object.entries(convertDishes(dishes)).map(([type, dishes]) => {
            return {
              "type": type,
              "dishes": dishes
            };
          }),
          "next_cursor": dishes.length > 10 ? new Cursor(dishes[10].id).serialized : null
        }
      });
    } catch (err) {
      console.error("Error when getting menu list with cursor=", cursor, '\n', err);
      return res.status(500).send({ "error": "internal server error" });
    }
  }
  // with type
  if (req.query.type !== undefined) {
    let minDishId = await getMinDishIdInTypeOfRestaurant(restaurantId, req.query.type);
    if (minDishId === null) {
      return res.status(400).send({ "error": "invalid restaurantId or type" });
    }
    try {
      const dishes = await getDishesOfRestaurant(restaurantId, minDishId);
      return res.status(200).send({
        "data": {
          "menu": Object.entries(convertDishes(dishes)).map(([type, dishes]) => {
            return {
              "type": type,
              "dishes": dishes
            };
          }),
          "next_cursor": dishes.length > 10 ? new Cursor(dishes[10].id).serialized : null
        }
      });
    } catch (err) {
      console.error("Error when getting menu list with type=", req.query.type, '\n', err);
      return res.status(500).send({ "error": "internal server error" });
    }
  }
  // neither of both
  try {
    const dishes = await getDishesOfRestaurant(restaurantId, Number.MIN_SAFE_INTEGER);
    return res.status(200).send({
      "data": {
        "menu": Object.entries(convertDishes(dishes)).map(([type, dishes]) => {
          return {
            "type": type,
            "dishes": dishes
          };
        }),
        "next_cursor": dishes.length > 10 ? new Cursor(dishes[10].id).serialized : null
      }
    });
  } catch (err) {
    console.error("Error when getting menu list with neither cursor nor type\n", err);
    return res.status(500).send({ "error": "internal server error" });
  }
}
