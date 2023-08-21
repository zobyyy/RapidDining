import { getDishesOfRestaurant } from "../../model/menu.js";
import { pictureForFrontend } from "../../util/util.js";

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
 * */
export async function menuSearch(req, res) {
  const restaurantId = +req.query.restaurantId;
  if (Number.isNaN(restaurantId)) {
    return res.status(400).send({ "error": "invalid restaurantId" });
  }
  try {
    const dishes = await getDishesOfRestaurant(restaurantId);
    return res.status(200).send({
      "data": {
        "menu": Object.entries(convertDishes(dishes)).map(([type, dishes]) => {
          return {
            "type": type,
            "dishes": dishes
          };
        })
      }
    });
  } catch (err) {
    console.error("Error when getting menu list with neither cursor nor type\n", err);
    return res.status(500).send({ "error": "internal server error" });
  }
}
