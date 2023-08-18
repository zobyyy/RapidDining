import { base64url } from 'jose';

import { selectAllRestaurantSortedByTime } from '../../model/restaurant.js';

class Cursor {
  /**
    * @param {object} opt
    * @param {number} opt.restaurantId
    * */
  constructor({ restaurantId }) {
    this.restaurantId = restaurantId;
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
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * */
export async function restaurantList(req, res, next) { // eslint-disable-line no-unused-vars
  const headcount = +req.query.headcount;
  if (Number.isNaN(headcount)) {
    return res.status(400).send({ "error": "invalid headcount" })
  }

  /**@type {Cursor}*/
  let cursor;
  if (typeof req.query.cursor === "undefined") {
    cursor = new Cursor({ restaurantId: Number.MIN_SAFE_INTEGER });
  } else {
    try {
      cursor = Cursor.fromSerialized(req.query.cursor);
    } catch (err) {
      return res.status(400).send({ "error": "invalid cursor" });
    }
  }

  let restaurants;
  try {
    restaurants = await selectAllRestaurantSortedByTime(headcount, cursor.restaurantId);
  } catch (err) {
    console.error("Error occurred when getting restaurant list:", err);
    return res.status(500).send({ "error": "internal server error" });
  }
  res.status(200).send({
    "data": {
      "restaurants": restaurants.slice(0, 5).map(rest => {
        return {
          ...rest,
          "waitTime": rest.waitTime === null ? 0 : Number(rest.waitTime),
          "availability": rest.availability === null ? false : true
        };
      }),
      "next_cursor": restaurants.length > 5
        ? new Cursor({ restaurantId: restaurants[5].id }).serialized
        : null
    }
  });
}
